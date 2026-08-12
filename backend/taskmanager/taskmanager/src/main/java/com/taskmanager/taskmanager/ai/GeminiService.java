package com.taskmanager.taskmanager.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.taskmanager.taskmanager.dto.ai.AiTaskResponse;
import com.taskmanager.taskmanager.entity.Priority;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeminiService {

    private final Client geminiClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.model}")
    private String model;

    public AiTaskResponse generateTaskDetails(String title) {

        String prompt = """
                You are an AI task management assistant.

                Analyze the following task title and generate useful task details.

                Task title:
                "%s"

                Return ONLY valid JSON.
                Do not include markdown.
                Do not include ```json.
                Do not include any explanation outside the JSON.

                The JSON must contain exactly these fields:

                {
                  "description": "A clear and useful task description",
                  "priority": "LOW, MEDIUM, or HIGH",
                  "estimatedEffort": "Estimated effort such as 2 hours, 1 day, or 3 days"
                }

                Rules:
                - priority must be exactly LOW, MEDIUM, or HIGH
                - description should explain what needs to be done
                - estimatedEffort should be a short human-readable estimate
                """.formatted(title);

        try {

            GenerateContentConfig config =
                    GenerateContentConfig.builder()
                            .responseMimeType("application/json")
                            .candidateCount(1)
                            .build();

            GenerateContentResponse response =
                    geminiClient.models.generateContent(
                            model,
                            prompt,
                            config
                    );

            String responseText = response.text();

            if (responseText == null ||
                    responseText.isBlank()) {

                return fallbackResponse(title);
            }

            return parseResponse(responseText, title);

        } catch (Exception e) {

            System.err.println(
                    "Gemini API failed: " + e.getMessage()
            );

            return fallbackResponse(title);
        }
    }

    private AiTaskResponse parseResponse(
            String responseText,
            String title) {

        try {

            return objectMapper.readValue(
                    responseText,
                    AiTaskResponse.class
            );

        }catch (Exception e) {

            e.printStackTrace();

            return fallbackResponse(title);
        }
    }

    private AiTaskResponse fallbackResponse(
            String title) {

        return AiTaskResponse.builder()
                .description(
                        "Please add a detailed description for: "
                                + title
                )
                .priority(Priority.MEDIUM)
                .estimatedEffort("Not estimated")
                .build();
    }
}