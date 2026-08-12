package com.taskmanager.taskmanager.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AiTaskRequest {

    @NotBlank(message = "Task title is required")
    private String title;
}
