package com.taskmanager.taskmanager.controller;

import com.taskmanager.taskmanager.dto.ai.AiTaskRequest;
import com.taskmanager.taskmanager.dto.ai.AiTaskResponse;
import com.taskmanager.taskmanager.service.AiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/generate-task")
    public ResponseEntity<AiTaskResponse> generateTask(
            @Valid @RequestBody AiTaskRequest request) {

        AiTaskResponse response =
                aiService.generateTask(request);

        return ResponseEntity.ok(response);
    }
}