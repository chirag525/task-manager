package com.taskmanager.taskmanager.dto.ai;

import com.taskmanager.taskmanager.entity.Priority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiTaskResponse {

    private String description;

    private Priority priority;

    private String estimatedEffort;
}