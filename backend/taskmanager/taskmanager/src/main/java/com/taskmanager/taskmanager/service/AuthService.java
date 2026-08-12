package com.taskmanager.taskmanager.service;

import com.taskmanager.taskmanager.dto.auth.LoginRequest;
import com.taskmanager.taskmanager.dto.auth.LoginResponse;
import com.taskmanager.taskmanager.dto.auth.RegisterRequest;
import com.taskmanager.taskmanager.entity.User;
import com.taskmanager.taskmanager.exception.BadRequestException;
import com.taskmanager.taskmanager.exception.UnauthorizedException;
import com.taskmanager.taskmanager.repository.UserRepository;
import com.taskmanager.taskmanager.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        return LoginResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .build();
    }
}