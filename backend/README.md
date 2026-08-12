Task Manager Backend:-
A secure RESTful backend for a Task Management application built using Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA, MySQL, Gmail SMTP, Google Gemini API, and Docker.
The backend provides user authentication, authorization, task management, AI-powered task generation, validation, exception handling, and database persistence.

=>Features

User registration
User login
JWT-based authentication
JWT token validation
Spring Security authorization
BCrypt password encryption
Stateless authentication
Create tasks
View tasks
View individual task
Update tasks
Delete tasks
Update task status
Task priority management
AI-powered task generation using Google Gemini
Gemini API fallback handling
MySQL database integration
Spring Data JPA
Hibernate ORM
Request validation
Global exception handling
Custom exceptions
Email configuration using Gmail SMTP
Spring Boot Actuator
Docker containerization
Maven build system


=>Technologies Used

Technology	Purpose
Java 17	Backend programming
Spring Boot	Backend framework
Spring Web	REST API development
Spring Security	Authentication and authorization
JWT	Token-based authentication
BCrypt	Password hashing
Spring Data JPA	Database access
Hibernate	ORM
MySQL	Relational database
Spring Validation	Request validation
Spring Mail	Email functionality
Google Gemini API	AI task generation
Lombok	Reduce boilerplate code
Maven	Dependency management
Spring Boot Actuator	Application monitoring
Docker	Containerization

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
            │       └── taskmanager/
            │           └── taskmanager/
            │               │
            │               ├── ai/
            │               │   └── GeminiService.java
            │               │
            │               ├── config/
            │               │   └── GeminiConfig.java
            │               │
            │               ├── controller/
            │               │   ├── AiController.java
            │               │   ├── AuthController.java
            │               │   └── TaskController.java
            │               │
            │               ├── dto/
            │               │   ├── ai/
            │               │   │   ├── AiTaskRequest.java
            │               │   │   └── AiTaskResponse.java
            │               │   │
            │               │   ├── auth/
            │               │   │   ├── LoginRequest.java
            │               │   │   ├── LoginResponse.java
            │               │   │   └── RegisterRequest.java
            │               │   │
            │               │   └── task/
            │               │       ├── TaskCreateRequest.java
            │               │       ├── TaskResponse.java
            │               │       ├── TaskStatusRequest.java
            │               │       └── TaskUpdateRequest.java
            │               │
            │               ├── entity/
            │               │   ├── User.java
            │               │   ├── Task.java
            │               │   ├── Priority.java
            │               │   └── TaskStatus.java
            │               │
            │               ├── exception/
            │               │   ├── BadRequestException.java
            │               │   ├── GlobalExceptionHandler.java
            │               │   ├── ResourceNotFoundException.java
            │               │   └── UnauthorizedException.java
            │               │
            │               ├── repository/
            │               │   ├── UserRepository.java
            │               │   └── TaskRepository.java
            │               │
            │               ├── security/
            │               │   ├── CustomUserDetailsService.java
            │               │   ├── JwtAuthenticationFilter.java
            │               │   ├── JwtService.java
            │               │   └── SecurityConfig.java
            │               │
            │               ├── service/
            │               │   ├── AiService.java
            │               │   ├── AuthService.java
            │               │   └── TaskService.java
            │               │
            │               └── TaskmanagerApplication.java
            │
            └── resources/
                └── application.properties

            └── test/
                └── java/


                
