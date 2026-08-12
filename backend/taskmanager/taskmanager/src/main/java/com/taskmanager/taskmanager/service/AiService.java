package com.taskmanager.taskmanager.service;

import com.taskmanager.taskmanager.ai.GeminiService;
import com.taskmanager.taskmanager.dto.ai.AiTaskRequest;
import com.taskmanager.taskmanager.dto.ai.AiTaskResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiService {

    private final GeminiService geminiService;

    public AiTaskResponse generateTask(AiTaskRequest request) {

        return geminiService.generateTaskDetails(
                request.getTitle()
        );
    }
}