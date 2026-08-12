package com.taskmanager.taskmanager.dto.task;

import com.taskmanager.taskmanager.entity.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskStatusRequest {

    @NotNull(message = "Status is required")
    private TaskStatus status;
}
