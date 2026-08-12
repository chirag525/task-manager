package com.taskmanager.taskmanager.dto.task;

import com.taskmanager.taskmanager.entity.Priority;
import com.taskmanager.taskmanager.entity.TaskStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private Priority priority;

    private LocalDate dueDate;

    private TaskStatus status;

    private LocalDateTime createdAt;
}
