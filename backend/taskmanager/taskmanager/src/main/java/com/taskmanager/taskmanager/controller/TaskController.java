package com.taskmanager.taskmanager.controller;

import com.taskmanager.taskmanager.dto.task.TaskCreateRequest;
import com.taskmanager.taskmanager.dto.task.TaskResponse;
import com.taskmanager.taskmanager.dto.task.TaskStatusRequest;
import com.taskmanager.taskmanager.dto.task.TaskUpdateRequest;
import com.taskmanager.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Validated
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskCreateRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        TaskResponse response =
                taskService.createTask(request, email);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks(
            Authentication authentication) {

        String email = authentication.getName();

        List<TaskResponse> tasks =
                taskService.getAllTasks(email);

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTask(
            @PathVariable
            @Positive(message = "Task ID must be greater than 0")
            Long id,
            Authentication authentication) {

        String email = authentication.getName();

        TaskResponse response =
                taskService.getTask(id, email);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable
            @Positive(message = "Task ID must be greater than 0")
            Long id,
            @Valid @RequestBody TaskUpdateRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        TaskResponse response =
                taskService.updateTask(
                        id,
                        request,
                        email
                );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(
            @PathVariable
            @Positive(message = "Task ID must be greater than 0")
            Long id,
            Authentication authentication) {

        String email = authentication.getName();

        taskService.deleteTask(id, email);

        return ResponseEntity.ok("Task deleted successfully");
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponse> updateStatus(
            @PathVariable
            @Positive(message = "Task ID must be greater than 0")
            Long id,
            @Valid @RequestBody TaskStatusRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        TaskResponse response =
                taskService.updateStatus(
                        id,
                        request,
                        email
                );

        return ResponseEntity.ok(response);
    }
}