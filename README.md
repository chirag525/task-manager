# Task Manager

A full-stack task management application built with **Spring Boot** and **React**. The application provides secure user authentication using JWT, task management features, MySQL persistence, email integration, and AI-powered task generation using the **Google Gemini API**.

The project also includes Docker support for containerizing the backend and frontend.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Stateless authentication using Spring Security
* BCrypt password hashing
* Protected task APIs
* Unauthorized request handling
* JWT authentication filter
* User-specific task access

### 📋 Task Management

Authenticated users can:

* Create tasks
* View all their tasks
* View a specific task
* Update tasks
* Delete tasks
* Change task status
* Set task priority
* Add task descriptions
* Track estimated effort

### 🤖 AI-Powered Task Generation

The application integrates with **Google Gemini** to automatically generate task details.

The user provides a task title, and the AI generates:

* Task description
* Priority
* Estimated effort

Example:

```text
Input:
Build login page

AI-generated output:
Description: Implement a secure login page...
Priority: HIGH
Estimated effort: 1 day
```

The backend also contains a fallback response mechanism if the Gemini API fails or returns an invalid response.

### 🗄️ Database

* MySQL database
* Spring Data JPA
* Hibernate ORM
* Automatic database schema updates using Hibernate
* User and task persistence
* User-task relationship

### 🎨 Frontend

The frontend is built using:

* React
* React Router
* Vite
* Tailwind CSS
* Lucide React icons

The frontend provides:

* Registration page
* Login page
* Protected routes
* Dashboard
* Task creation
* Task editing
* Task deletion
* Task status updates
* AI task generation
* Loading states
* Toast notifications
* Modal components
* Authentication state management
* Task state management

### 🛡️ Security

* JWT authentication
* BCrypt password encoding
* Stateless Spring Security configuration
* Protected API endpoints
* Authorization header using Bearer tokens
* Environment variables for sensitive configuration
* API error handling without exposing stack traces

### 🐳 Docker

The project includes Docker support for:

* Spring Boot backend
* React frontend
* MySQL database through Docker Compose

The goal is to allow the complete application to be started using Docker Compose.

---

# 🏗️ Application Architecture

```text
                    Task Manager
                         │
              ┌──────────┴──────────┐
              │                     │
          Frontend               Backend
           React              Spring Boot
           Vite                    │
           Nginx             ┌─────┴─────┐
              │              │           │
              │           Security     Services
              │           JWT/JPA      AI/Tasks
              │              │           │
              └──────────────┤           │
                             │           │
                           MySQL     Google Gemini
```

---

# 🛠️ Technologies Used

## Backend

| Technology        | Purpose                          |
| ----------------- | -------------------------------- |
| Java 17           | Programming language             |
| Spring Boot 4.1.0 | Backend framework                |
| Spring Web        | REST APIs                        |
| Spring Data JPA   | Database access                  |
| Hibernate         | ORM                              |
| Spring Security   | Authentication and authorization |
| JWT               | Token-based authentication       |
| BCrypt            | Password hashing                 |
| MySQL             | Relational database              |
| Spring Validation | Request validation               |
| Spring Mail       | Email integration                |
| Google Gemini API | AI task generation               |
| Lombok            | Boilerplate reduction            |
| Maven             | Dependency management and build  |
| Spring Actuator   | Application monitoring           |

## Frontend

| Technology   | Purpose              |
| ------------ | -------------------- |
| React 18     | UI framework         |
| Vite         | Frontend build tool  |
| React Router | Client-side routing  |
| Tailwind CSS | Styling              |
| Lucide React | Icons                |
| JavaScript   | Frontend programming |

## DevOps

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| Docker         | Containerization            |
| Docker Compose | Multi-container application |
| Nginx          | Frontend production server  |
| Git            | Version control             |
| GitHub         | Source code repository      |

---

# 📁 Project Structure

```text
task-manager/
│
├── backend/
│   └── taskmanager/
│       └── taskmanager/
│           ├── pom.xml
│           ├── mvnw
│           ├── mvnw.cmd
│           ├── Dockerfile
│           │
│           └── src/
│               ├── main/
│               │   ├── java/
│               │   │   └── com/taskmanager/taskmanager/
│               │   │       │
│               │   │       ├── ai/
│               │   │       │   └── GeminiService.java
│               │   │       │
│               │   │       ├── config/
│               │   │       │   └── GeminiConfig.java
│               │   │       │
│               │   │       ├── controller/
│               │   │       │   ├── AiController.java
│               │   │       │   ├── AuthController.java
│               │   │       │   └── TaskController.java
│               │   │       │
│               │   │       ├── dto/
│               │   │       │   ├── ai/
│               │   │       │   ├── auth/
│               │   │       │   └── task/
│               │   │       │
│               │   │       ├── entity/
│               │   │       │   ├── User.java
│               │   │       │   ├── Task.java
│               │   │       │   ├── Priority.java
│               │   │       │   └── TaskStatus.java
│               │   │       │
│               │   │       ├── exception/
│               │   │       │   ├── BadRequestException.java
│               │   │       │   ├── GlobalExceptionHandler.java
│               │   │       │   ├── ResourceNotFoundException.java
│               │   │       │   └── UnauthorizedException.java
│               │   │       │
│               │   │       ├── repository/
│               │   │       │   ├── TaskRepository.java
│               │   │       │   └── UserRepository.java
│               │   │       │
│               │   │       ├── security/
│               │   │       │   ├── CustomUserDetailsService.java
│               │   │       │   ├── JwtAuthenticationFilter.java
│               │   │       │   ├── JwtService.java
│               │   │       │   └── SecurityConfig.java
│               │   │       │
│               │   │       ├── service/
│               │   │       │   ├── AiService.java
│               │   │       │   ├── AuthService.java
│               │   │       │   └── TaskService.java
│               │   │       │
│               │   │       └── TaskmanagerApplication.java
│               │   │
│               │   └── resources/
│               │       └── application.properties
│               │
│               └── test/
│
├── frontend/
│   └── final_frontend/
│       ├── package.json
│       ├── package-lock.json
│       ├── Dockerfile
│       ├── vite.config.js
│       ├── tailwind.config.js
│       ├── index.html
│       ├── .env.example
│       │
│       └── src/
│           ├── components/
│           ├── context/
│           ├── pages/
│           ├── services/
│           ├── utils/
│           ├── App.jsx
│           ├── index.css
│           └── main.jsx
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

> Note: The exact folder nesting may differ depending on how the backend and frontend directories are organized in the repository.

---

# 🔌 REST API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```text
User registered successfully
```

---

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

The API returns a JWT token that is used for authenticated requests.

---

# 📋 Task APIs

All task APIs require JWT authentication.

The token should be sent using:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Create Task

```http
POST /api/tasks
```

### Get All Tasks

```http
GET /api/tasks
```

### Get Task

```http
GET /api/tasks/{id}
```

### Update Task

```http
PUT /api/tasks/{id}
```

### Delete Task

```http
DELETE /api/tasks/{id}
```

### Update Task Status

```http
PATCH /api/tasks/{id}/status
```

---

# 🤖 AI API

### Generate Task Details

```http
POST /api/ai/generate-task
```

Example request:

```json
{
  "title": "Build authentication system"
}
```

The Gemini integration generates:

```json
{
  "description": "Implement a secure authentication system...",
  "priority": "HIGH",
  "estimatedEffort": "2 days"
}
```

If the Gemini API fails, the backend returns a fallback response instead of crashing the request.

---

# 🔐 Authentication Flow

```text
User
 │
 │ Register
 ▼
Backend
 │
 ▼
Password hashed using BCrypt
 │
 ▼
MySQL
```

For login:

```text
User
 │
 │ Email + Password
 ▼
Spring Security
 │
 ▼
Verify credentials
 │
 ▼
JWT generated
 │
 ▼
Frontend stores token
```

For protected APIs:

```text
Frontend
 │
 │ Authorization: Bearer <JWT>
 ▼
JwtAuthenticationFilter
 │
 ▼
Validate JWT
 │
 ▼
Authenticate User
 │
 ▼
Controller
 │
 ▼
Service
 │
 ▼
Repository
 │
 ▼
MySQL
```

---

# 🤖 Gemini AI Flow

```text
User enters task title
          │
          ▼
React Frontend
          │
          ▼
POST /api/ai/generate-task
          │
          ▼
Spring Boot AiController
          │
          ▼
AiService
          │
          ▼
GeminiService
          │
          ▼
Google Gemini API
          │
          ▼
Generated JSON
          │
          ▼
AiTaskResponse
          │
          ▼
React Frontend
```

The configured Gemini model is:

```text
gemini-2.5-flash
```

---

# 🗄️ Database Configuration

The application uses MySQL.

Default database URL:

```text
jdbc:mysql://localhost:3306/taskmanager_db
```

The database should exist before starting the backend when running without Docker.

Create the database using:

```sql
CREATE DATABASE taskmanager_db;
```

Hibernate is configured with:

```properties
spring.jpa.hibernate.ddl-auto=update
```

This allows Hibernate to update the database schema based on the application's entity definitions.

---

# 🔑 Environment Variables

Sensitive values should not be committed to GitHub.

The backend uses environment variables for secrets such as:

```text
JWT_SECRET
GEMINI_API_KEY
```

If email functionality is enabled/configured, the required mail credentials should also be supplied through environment variables.

Example:

```env
JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-app-password
```

For the frontend:

```env
VITE_API_URL=
```

For local Vite development, the frontend uses `/api` and Vite proxies requests to:

```text
http://localhost:8080
```

For a deployed frontend, `VITE_API_URL` can point to the backend API origin.

### Important

Do **not** commit:

```text
.env
```

or real API keys, JWT secrets, database passwords, or mail credentials.

Use:

```text
.env.example
```

to document the required variables.

---

# 🖥️ Running the Project Locally

## Prerequisites

Install:

* Java 17
* Maven or use the included Maven Wrapper
* Node.js
* npm
* MySQL
* Git

For Docker execution:

* Docker Desktop
* Docker Compose

---

# ▶️ Running the Backend

Navigate to the backend directory:

```bash
cd backend/taskmanager/taskmanager
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Or:

```bash
./mvnw spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

# ▶️ Running the Frontend

Navigate to:

```bash
cd frontend/final_frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

The Vite development server proxies `/api` requests to:

```text
http://localhost:8080
```

---

# 🧪 Building the Backend

From the backend directory:

```powershell
.\mvnw.cmd clean package
```

To skip tests:

```powershell
.\mvnw.cmd clean package -DskipTests
```

The generated JAR will be available inside:

```text
target/
```

---

# 🧪 Building the Frontend

From the frontend directory:

```bash
npm run build
```

The production build will be generated in:

```text
dist/
```

---

# 🐳 Docker

The project supports containerization of the application.

## Backend Docker Image

Navigate to the backend directory:

```bash
cd backend/taskmanager/taskmanager
```

Build the backend image:

```bash
docker build -t taskmanager-backend .
```

Run the backend container:

```bash
docker run -p 8080:8080 taskmanager-backend
```

The backend will be available on:

```text
http://localhost:8080
```

---

# 🐳 Frontend Docker Image

Navigate to the frontend directory:

```bash
cd frontend/final_frontend
```

Build the frontend image:

```bash
docker build -t taskmanager-frontend .
```

Run the frontend container:

```bash
docker run -p 3000:80 taskmanager-frontend
```

The frontend will be available at:

```text
http://localhost:3000
```

The frontend Docker image uses a multi-stage build:

```text
Node.js
   ↓
npm install
   ↓
npm run build
   ↓
React production files
   ↓
Nginx
```

---

# 🐳 Docker Compose

The complete application can be run using Docker Compose.

The intended architecture is:

```text
                 Docker Compose
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
   Frontend        Backend         MySQL
    Nginx        Spring Boot
    :3000           :8080          :3306
       │              │
       └──────────────┘
              │
        Docker Network
```

Start the complete application:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up --build -d
```

Stop the application:

```bash
docker compose down
```

View running containers:

```bash
docker ps
```

View logs:

```bash
docker compose logs
```

View backend logs:

```bash
docker compose logs backend
```

View frontend logs:

```bash
docker compose logs frontend
```

---

# 🔒 Security Considerations

The project follows several security practices:

* Passwords are hashed using BCrypt.
* JWT is used for stateless authentication.
* Protected endpoints require authentication.
* JWT secrets are loaded through environment variables.
* Gemini API keys are loaded through environment variables.
* Sensitive configuration should not be committed to Git.
* Spring Security uses a stateless session policy.
* Stack traces are not exposed through API error responses.

Never commit real:

```text
JWT secrets
API keys
Database passwords
Gmail passwords
Application passwords
.env files
```

---

# ⚠️ Configuration Before Running

Before running the project, make sure the required environment variables are configured.

Example:

```env
JWT_SECRET=replace-with-your-secret
GEMINI_API_KEY=replace-with-your-gemini-api-key
```

If database credentials are also externalized:

```env
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
```

If mail functionality is configured:

```env
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-app-password
```

Do not use the example values in production.

---

# 🧩 Error Handling

The backend includes centralized exception handling through:

```text
GlobalExceptionHandler
```

Custom exceptions include:

```text
BadRequestException
ResourceNotFoundException
UnauthorizedException
```

The application avoids exposing internal stack traces in API responses.

---

# 📦 Backend Layered Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Controller Layer

Handles HTTP requests and responses.

Examples:

```text
AuthController
TaskController
AiController
```

### Service Layer

Contains business logic.

Examples:

```text
AuthService
TaskService
AiService
```

### Repository Layer

Handles database operations using Spring Data JPA.

Examples:

```text
UserRepository
TaskRepository
```

### Entity Layer

Contains database entities:

```text
User
Task
Priority
TaskStatus
```

### Security Layer

Contains:

```text
SecurityConfig
JwtService
JwtAuthenticationFilter
CustomUserDetailsService
```

---

# 🧪 Testing

The backend contains a test structure under:

```text
src/test/
```

Run tests using:

```bash
./mvnw test
```

On Windows:

```powershell
.\mvnw.cmd test
```

---

# 🌐 Frontend API Communication

The frontend centralizes API communication through:

```text
src/services/api.js
```

The API client handles:

* Authentication
* JWT token attachment
* API requests
* JSON responses
* HTTP errors
* Unauthorized responses
* Task operations
* AI task generation

The JWT token is attached to authenticated requests as:

```http
Authorization: Bearer <token>
```

---

# 🔄 Git Workflow

After making changes:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe your changes"
```

Push:

```bash
git push
```

---

# 📌 Example Development Workflow

```text
1. Clone repository
        ↓
2. Configure environment variables
        ↓
3. Create MySQL database
        ↓
4. Start Spring Boot backend
        ↓
5. Start React frontend
        ↓
6. Register a user
        ↓
7. Login
        ↓
8. Create tasks
        ↓
9. Update/delete tasks
        ↓
10. Use AI task generation
```

Docker workflow:

```text
1. Clone repository
        ↓
2. Configure .env
        ↓
3. Start Docker Desktop
        ↓
4. docker compose up --build
        ↓
5. Frontend + Backend + MySQL start
```

---

# 🎯 Project Objectives

The main objectives of this project are:

* Build a complete full-stack application.
* Implement RESTful APIs using Spring Boot.
* Implement JWT authentication and authorization.
* Persist application data using MySQL and JPA.
* Build a responsive frontend using React.
* Integrate an external AI service using Google Gemini.
* Implement proper backend layering and exception handling.
* Containerize the application using Docker.
* Use environment variables for sensitive configuration.
* Maintain the source code using Git and GitHub.

---

# 👨‍💻 Author

**Chirag K**

Full-Stack Task Management Application built using:

**Java + Spring Boot + Spring Security + JWT + MySQL + React + Vite + Tailwind CSS + Google Gemini + Docker**

---

# 📄 License

This project is intended for educational, demonstration, and portfolio purposes.
