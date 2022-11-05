package com.swozo.api.web.course;

import com.swozo.api.orchestrator.ScheduleService;
import com.swozo.api.web.activity.ActivityRepository;
import com.swozo.api.web.activity.request.CreateActivityRequest;
import com.swozo.api.web.auth.dto.RoleDto;
import com.swozo.api.web.course.dto.CourseDetailsDto;
import com.swozo.api.web.course.dto.CourseSummaryDto;
import com.swozo.api.web.course.request.CreateCourseRequest;
import com.swozo.api.web.course.request.EditCourseRequest;
import com.swozo.api.web.course.request.JoinCourseRequest;
import com.swozo.api.web.course.request.ModifyParticipantRequest;
import com.swozo.api.web.exceptions.types.course.CourseNotFoundException;
import com.swozo.api.web.exceptions.types.course.InvalidCoursePasswordException;
import com.swozo.api.web.exceptions.types.user.UserNotFoundException;
import com.swozo.api.web.user.UserRepository;
import com.swozo.api.web.user.UserService;
import com.swozo.mapper.ActivityMapper;
import com.swozo.mapper.CourseMapper;
import com.swozo.persistence.Course;
import com.swozo.persistence.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.function.BiConsumer;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final CourseMapper courseMapper;
    private final ActivityMapper activityMapper;
    private final ActivityRepository activityRepository;
    private final ScheduleService scheduleService;
    private final CourseValidator courseValidator;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<CourseDetailsDto> getUserCourses(Long userId, RoleDto userRole) {
        var courses = userRole.equals(RoleDto.STUDENT) ?
                courseRepository.getCoursesByStudentsId(userId) :
                courseRepository.getCoursesByTeacherId(userId);
        var user = userService.getUserById(userId);

        return courses.stream()
                .map(course -> courseMapper.toDto(course, user, course.isCreator(userId)))
                .toList();
    }

    public CourseDetailsDto getCourseDetails(Long courseId, Long userId) {
        var course = courseRepository.getById(courseId);
        var user = userService.getUserById(userId);
        return courseMapper.toDto(course, user, course.isCreator(userId));
    }

    public CourseSummaryDto getCourseSummary(String joinUUID) {
       return courseRepository.getByJoinUUID(joinUUID)
               .map(courseMapper::toDto)
               .orElseThrow(() -> CourseNotFoundException.withUUID(joinUUID));
    }

    public List<CourseSummaryDto> getPublicCoursesNotParticipatedBy(Long userId, Long offset, Long limit) {
        // TODO: proper pagination

        return courseRepository.getCoursesByIsPublicTrue().stream()
                .filter(course -> course.getStudents().stream()
                        .map(userCourseData -> userCourseData.getId().getUserId())
                        .noneMatch(id -> id.equals(userId))
                )
                .filter(course -> !course.getTeacher().getId().equals(userId))
                .map(courseMapper::toDto)
                .toList();
    }

    @Transactional
    public CourseDetailsDto createCourse(CreateCourseRequest createCourseRequest, Long teacherId, boolean sandboxMode) {
        if (!sandboxMode) {
            courseValidator.validateNewCourse(createCourseRequest);
        }

        var teacher = userService.getUserById(teacherId);
        var course = courseMapper.toPersistence(createCourseRequest, teacher);
        var activities = createCourseRequest.activities().stream().map(activityMapper::toPersistence);

        activities.forEach(course::addActivity);
        course.setJoinUUID(UUID.randomUUID().toString());
        course.setSandboxMode(sandboxMode);

        courseRepository.save(course);

        if (!course.getActivities().isEmpty()) {
            scheduleService.scheduleActivities(course.getActivities());
        }

        return courseMapper.toDto(course, teacher, true);
    }

    @Transactional
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
        // TODO: remove all files
    }

    @Transactional
    public CourseDetailsDto joinCourse(JoinCourseRequest joinCourseRequest, Long userId) {
        var course = courseRepository.getByJoinUUID(joinCourseRequest.joinUUID())
                .orElseThrow(() -> CourseNotFoundException.withUUID(joinCourseRequest.joinUUID()));
        var student = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::ofAuthenticationOwner);

        courseValidator.validateJoinCourseRequest(student, course);

        if (!course.getPassword().equals(joinCourseRequest.password())) {
            throw new InvalidCoursePasswordException();
        }

        course.addStudent(student);
        courseRepository.save(course);
        return courseMapper.toDto(course, student, false);
    }

    private void handleNewStudent(Course course, User student) {
//         assert course.getStudents().size() + 1 <= course.expectedStudentCount
        course.getActivities().forEach(activity -> {
              activity.getModules().forEach(activityModule -> {
                  activityModule.getSchedules().stream()
                          .flatMap(scheduleInfo -> scheduleInfo.getUserActivityLinks().stream())
                          .filter(userActivityLink -> userActivityLink.getUser() == null)
                          .findAny()
                          .ifPresent(userActivityLink -> userActivityLink.setUser(student));
              });
        });
    }

    @Transactional
    public CourseDetailsDto editCourse(Long userId, Long courseId, EditCourseRequest request) {
        var course = getById(courseId);
        courseValidator.validateEditCourseRequest(course, request, userId);

        request.name().ifPresent(course::setName);
        request.description().ifPresent(course::setDescription);
        request.isPublic().ifPresent(course::setIsPublic);
        request.subject().ifPresent(course::setSubject);
        request.password().ifPresent(course::setPassword);

        courseRepository.save(course);

        return courseMapper.toDto(course, course.getTeacher(), true);
    }

    @Transactional
    public CourseDetailsDto addSingleActivity(Long userId, Long courseId, CreateActivityRequest request) {
        var course = getById(courseId);
        courseValidator.validateAddActivityRequest(course, request, userId);
        var activity = activityMapper.toPersistence(request);

        course.addActivity(activity);

        scheduleService.scheduleActivities(List.of(activityRepository.save(activity)));

        return courseMapper.toDto(course, course.getTeacher(), true);
    }

    @Transactional
    public CourseDetailsDto addStudent(Long teacherId, Long courseId, ModifyParticipantRequest modifyParticipantRequest) {
        return modifyCourseParticipant(courseId, modifyParticipantRequest.email(), (student, course) -> {
            courseValidator.validateAddStudentRequest(student, teacherId, course);
            course.addStudent(student);
        });
    }

    @Transactional
    public CourseDetailsDto deleteStudent(Long teacherId, Long courseId, String studentEmail) {
        return modifyCourseParticipant(courseId, studentEmail, (student, course) -> course.deleteStudent(student));
    }

    private CourseDetailsDto modifyCourseParticipant(Long courseId, String studentEmail, BiConsumer<User, Course> modifier) {
        var course = getById(courseId);
        var student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> UserNotFoundException.withEmail(studentEmail));

        modifier.accept(student, course);
        courseRepository.save(course);
        return courseMapper.toDto(course, course.getTeacher(), true);
    }

    private Course getById(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> CourseNotFoundException.withId(courseId));
    }
}
