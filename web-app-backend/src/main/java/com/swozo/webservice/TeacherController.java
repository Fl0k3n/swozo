package com.swozo.webservice;

import com.swozo.databasemodel.Activity;
import com.swozo.databasemodel.Course;
import com.swozo.security.AccessToken;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Collection;
import java.util.LinkedList;

//tu nazwa wydaje mi sie że do zmiany, ale nwm jak nazwać taki najogólniejszy controller,
//który ma obsługiwać listowanie i dodawanie/usuwanie kursów
public class TeacherController {
    private final String teacherService = "course service";

    @GetMapping("/course_list")
    @PreAuthorize("hasRole('TEACHER')")
    public Collection<Course> getActivityList(AccessToken token){
        System.out.println("course list");
        return new LinkedList<Course>();
    }

    @PostMapping("/add_course")
    @PreAuthorize("hasRole('TEACHER')")
    public String addCourse(AccessToken token){
        System.out.println("creating new course");
        return "course_id";
    }

    @PostMapping("/deleting_course")
    @PreAuthorize("hasRole('TEACHER')")
    public String deleteCourse(AccessToken token){
        System.out.println("deleting new course");
        return "course deleted";
    }
}
