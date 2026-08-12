backend/
└── taskmanager/
    └── taskmanager/
        │
        ├── pom.xml
        ├── mvnw
        ├── mvnw.cmd
        ├── Dockerfile
        ├── .gitignore
        │
        └── src/
            │
            ├── main/
            │   │
            │   ├── java/
            │   │   └── com/
            │   │       └── taskmanager/
            │   │           └── taskmanager/
            │   │
            │   │               ├── ai/
            │   │               │   └── GeminiService.java
            │   │               │
            │   │               ├── config/
            │   │               │   └── GeminiConfig.java
            │   │               │
            │   │               ├── controller/
            │   │               │   ├── AiController.java
            │   │               │   ├── AuthController.java
            │   │               │   └── TaskController.java
            │   │               │
            │   │               ├── dto/
            │   │               │   │
            │   │               │   ├── ai/
            │   │               │   │   ├── AiTaskRequest.java
            │   │               │   │   └── AiTaskResponse.java
            │   │               │   │
            │   │               │   ├── auth/
            │   │               │   │   ├── LoginRequest.java
            │   │               │   │   ├── LoginResponse.java
            │   │               │   │   └── RegisterRequest.java
            │   │               │   │
            │   │               │   └── task/
            │   │               │       ├── TaskCreateRequest.java
            │   │               │       ├── TaskResponse.java
            │   │               │       ├── TaskStatusRequest.java
            │   │               │       └── TaskUpdateRequest.java
            │   │               │
            │   │               ├── entity/
            │   │               │   ├── User.java
            │   │               │   ├── Task.java
            │   │               │   ├── Priority.java
            │   │               │   └── TaskStatus.java
            │   │               │
            │   │               ├── exception/
            │   │               │   ├── BadRequestException.java
            │   │               │   ├── GlobalExceptionHandler.java
            │   │               │   ├── ResourceNotFoundException.java
            │   │               │   └── UnauthorizedException.java
            │   │               │
            │   │               ├── repository/
            │   │               │   ├── UserRepository.java
            │   │               │   └── TaskRepository.java
            │   │               │
            │   │               ├── security/
            │   │               │   ├── CustomUserDetailsService.java
            │   │               │   ├── JwtAuthenticationFilter.java
            │   │               │   ├── JwtService.java
            │   │               │   └── SecurityConfig.java
            │   │               │
            │   │               ├── service/
            │   │               │   ├── AiService.java
            │   │               │   ├── AuthService.java
            │   │               │   └── TaskService.java
            │   │               │
            │   │               └── TaskmanagerApplication.java
            │   │
            │   └── resources/
            │       └── application.properties
            │
            └── test/
                └── java/
