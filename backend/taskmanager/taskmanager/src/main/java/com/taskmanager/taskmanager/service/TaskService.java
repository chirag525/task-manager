package com.taskmanager.taskmanager.service;

import com.taskmanager.taskmanager.dto.task.TaskCreateRequest;
import com.taskmanager.taskmanager.dto.task.TaskResponse;
import com.taskmanager.taskmanager.dto.task.TaskStatusRequest;
import com.taskmanager.taskmanager.dto.task.TaskUpdateRequest;
import com.taskmanager.taskmanager.entity.Task;
import com.taskmanager.taskmanager.entity.User;
import com.taskmanager.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.taskmanager.repository.TaskRepository;
import com.taskmanager.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskResponse createTask(
            TaskCreateRequest request,
            String email) {

        User user = getUser(email);

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .user(user)
                .build();

        Task savedTask = taskRepository.save(task);

        return convertToResponse(savedTask);
    }

    public List<TaskResponse> getAllTasks(String email) {

        User user = getUser(email);

        return taskRepository.findByUser(user)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public TaskResponse getTask(
            Long taskId,
            String email) {

        User user = getUser(email);

        Task task = taskRepository
                .findByIdAndUser(taskId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        return convertToResponse(task);
    }

    public TaskResponse updateTask(
            Long taskId,
            TaskUpdateRequest request,
            String email) {

        User user = getUser(email);

        Task task = taskRepository
                .findByIdAndUser(taskId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());

        Task updatedTask = taskRepository.save(task);

        return convertToResponse(updatedTask);
    }

    public void deleteTask(
            Long taskId,
            String email) {

        User user = getUser(email);

        Task task = taskRepository
                .findByIdAndUser(taskId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        taskRepository.delete(task);
    }

    public TaskResponse updateStatus(
            Long taskId,
            TaskStatusRequest request,
            String email) {

        User user = getUser(email);

        Task task = taskRepository
                .findByIdAndUser(taskId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        task.setStatus(request.getStatus());

        Task updatedTask = taskRepository.save(task);

        return convertToResponse(updatedTask);
    }

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    private TaskResponse convertToResponse(Task task) {

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .build();
    }
}