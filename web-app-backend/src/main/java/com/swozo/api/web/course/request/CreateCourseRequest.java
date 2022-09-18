package com.swozo.api.web.course.request;

import com.swozo.api.web.activity.request.CreateActivityRequest;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record CreateCourseRequest(
        @Schema(required = true) String name,
        @Schema(required = true) String subject,
        @Schema(required = true) String description,
        @Schema(required = true) int expectedStudentCount,
        @Schema(required = true) List<CreateActivityRequest> activities,
        @Schema(required = false) String password
) {
}
