# TaskFlow Frontend

React + Vite + Tailwind CSS frontend for the AI-Powered Task Management Portal.

## Requirements covered

- Responsive UI
- Spring Boot REST API integration
- JWT authentication flow
- Registration and login
- Protected dashboard
- Create, edit, delete and status-update tasks
- Client-side form validation
- AI task description/priority/effort generation
- Basic state management with React Context
- Loading, empty, error and success states
- Search and status/priority filters

## Backend contract

The frontend matches the supplied Spring Boot backend:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `GET /api/tasks/{id}`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`
- `PATCH /api/tasks/{id}/status`
- `POST /api/ai/generate-task`

JWT is sent as `Authorization: Bearer <token>`.

## Run locally

1. Start the Spring Boot backend on port `8080`.
2. Make sure MySQL and the backend configuration are working.
3. Install frontend dependencies:

```bash
npm install
```

4. Start Vite:

```bash
npm run dev
```

5. Open `http://localhost:5173`.

The Vite development server proxies `/api` to `http://localhost:8080`, so no CORS change is required for local development.

## Production

Set `VITE_API_URL` to the deployed backend API origin including `/api`.

For a separate production frontend/backend domain, enable CORS in Spring Security for the frontend origin. The supplied backend currently does not configure CORS.

## Important security note

The supplied backend `application.properties` contains a Gemini API key. Do not commit real API keys to GitHub. Move secrets to environment variables before submission/deployment.
