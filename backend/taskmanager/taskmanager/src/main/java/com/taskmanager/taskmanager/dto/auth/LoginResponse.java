package com.taskmanager.taskmanager.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginResponse {

    private String token;

    private String tokenType;

    private Long userId;

    private String email;
}
