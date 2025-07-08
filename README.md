# LoginSystem

A full-stack authentication system for a SaaS product. Users can:

- Register
- Log in
- View a list of all registered users (authentication required)

## Tech Stack

- Backend: Java 17, Spring Boot, JPA/Hibernate
- Frontend: React (Vite)
- Database: PostgreSQL (Dockerized)
- Containerization: Docker & Docker Compose
- Build Tool: Maven (backend)

## Prerequisites

Make sure your development environment has:

- Docker installed and running
- No other service running on ports 5432 (PostgreSQL), 8080 (backend), or 5173 (frontend)
- Git (for cloning the repository)

## Run Locally

Clone the project

```bash
  git clone https://github.com/mica789/LoginSystem.git
```

Go to the project directory

```bash
  cd LoginSystem
```

Start all services (backend, database, frontend)

```bash
  docker-compose up --build
```

- The frontend will be available at http://localhost:5173
- The backend API runs at http://localhost:8080/api/auth

## API Reference

#### Register User

```http
  POST /api/auth/register
```

| Parameter  | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `username` | `string` | **Required**. Unique username      |
| `email`    | `string` | **Required**. Valid email address  |
| `password` | `string` | **Required**. Minimum 6 characters |

Request Body Example:
{
"username": "testuser",
"email": "test@example.com",
"password": "securePassword"
}

Response:
Returns the created user object without password or salt fields.

#### Login User

```http
  POST /api/auth/login
```

| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `username` | `string` | **Required**. Username to login |
| `password` | `string` | **Required**. User’s password   |

Request Body Example:
{
"username": "testuser",
"password": "securePassword"
}

Response:
Returns an authentication token or login success message.

#### Get All Users (Requires Authentication)

```http
  GET /api/auth/users
```

| Parameter       | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

Response:
Returns a list of users with sensitive fields (password, salt) omitted.

## Support

For questions or support, please open an issue in the GitHub repository or contact mica.raab@gmail.com.

## Appendix

Note: This is a demonstration project for a technical assessment as part of an interview process. The authentication system is implemented without third-party libraries as requested, but for production use, consider established authentication solutions for enhanced security.
