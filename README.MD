# 🔐 Auth App – Spring Boot & React

A full-stack authentication system built with **Spring Boot 3 (Java)** on the backend and **React 19 + TypeScript + Vite** on the frontend. It supports traditional email/password authentication along with **OAuth2 login (Google & GitHub)**, JWT-based access & refresh tokens, and role-based access control.

---

## ✨ Features

- 🔑 User registration & login with email/password
- 🔁 JWT access token + refresh token flow
- 🌐 OAuth2 social login (Google, GitHub)
- 🛡️ Role-based authorization (Admin / Guest) using Spring Security
- 🍪 HTTP cookie-based refresh token handling
- 📄 API documentation via Swagger / OpenAPI
- 🎨 Modern UI with Tailwind CSS, shadcn/ui components, Framer Motion animations
- 🗂️ Global exception handling with structured API error responses
- ☁️ Cloudinary integration (media/file handling)

---

## 🏗️ Tech Stack

### Backend (`auth-backend`)
| Technology | Purpose |
|---|---|
| Java + Spring Boot 3.5 | Core application framework |
| Spring Security | Authentication & authorization |
| Spring Data JPA | Database ORM |
| MySQL | Database |
| JJWT | JWT token generation & validation |
| ModelMapper | DTO ↔ Entity mapping |
| Lombok | Boilerplate reduction |
| Springdoc OpenAPI | Swagger UI documentation |
| Maven | Build tool |

### Frontend (`auth-front`)
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| React Router 7 | Routing |
| Zustand | State management |
| Axios | HTTP client |
| Tailwind CSS 4 + shadcn/ui | Styling & components |
| Framer Motion | Animations |
| React Hot Toast | Notifications |

---

## 📁 Project Structure

```
auth-app-boot-react-dev/
├── auth-backend/                  # Spring Boot backend
│   └── src/main/java/com/substring/auth/app/
│       ├── auth/
│       │   ├── config/            # Security, JWT filter, OAuth2 success handler
│       │   ├── controllers/       # AuthController, UserController
│       │   ├── entities/           # User, Role, RefreshToken, Provider
│       │   ├── payload/            # DTOs / request-response models
│       │   ├── repositories/       # JPA repositories
│       │   └── services/           # Auth & User service layer
│       ├── config/                 # General app config (CORS, Swagger)
│       ├── dtos/                   # API error/response wrappers
│       └── exceptions/             # Global exception handling
│
└── auth-front/                     # React + Vite frontend
    └── src/
        ├── auth/                   # Auth state (Zustand store)
        ├── components/             # Navbar, OAuth buttons, UI components
        ├── config/                 # Axios API client
        ├── models/                 # TypeScript types
        ├── pages/                  # Login, Signup, Dashboard, OAuth callbacks
        └── services/               # AuthService (API calls)
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL Server
- Maven

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd auth-app-boot-react-dev
```

### 2. Backend Setup

Navigate to the backend folder:
```bash
cd auth-backend
```

Create the MySQL database:
```sql
CREATE DATABASE auth_app;
```

Configure your environment variables (recommended) or update `src/main/resources/application-prod.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/<your-db-name>
    username: <your-db-username>
    password: <your-db-password>

  security:
    oauth2:
      client:
        registration:
          google:
            client-id: <your-google-client-id>
            client-secret: <your-google-client-secret>
          github:
            client-id: <your-github-client-id>
            client-secret: <your-github-client-secret>

security:
  jwt:
    secret: <your-jwt-secret>
```

Run the backend:
```bash
./mvnw spring-boot:run
```

Backend runs at: `http://localhost:8080`

Swagger docs: `http://localhost:8080/swagger-ui.html`

### 3. Frontend Setup

Navigate to the frontend folder:
```bash
cd auth-front
```

Install dependencies:
```bash
npm install
```

Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Run the frontend:
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔗 API Endpoints

### Auth (`/api/v1/auth`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | Login with email & password |
| POST | `/register` | Register a new user |
| POST | `/refresh` | Refresh access token |
| POST | `/logout` | Logout & invalidate refresh token |

### Users (`/api/v1/users`) — Admin only
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all users |
| GET | `/{userId}` | Get user by ID |
| GET | `/email/{email}` | Get user by email |
| POST | `/` | Create a user |
| PUT | `/{userId}` | Update a user |
| DELETE | `/{userId}` | Delete a user |

### OAuth2 Login
- Google: `http://localhost:8080/oauth2/authorization/google`
- GitHub: `http://localhost:8080/oauth2/authorization/github`

On successful login, the user is redirected to:
```
http://localhost:5173/oauth/success
```
On failure:
```
http://localhost:5173/oauth/failure
```

---

## 🔐 Authentication Flow

1. User logs in via email/password **or** Google/GitHub OAuth2.
2. Backend generates a **JWT access token** (short-lived) and a **refresh token** (stored as an HTTP-only cookie).
3. Frontend stores the access token (via Zustand store) and attaches it to API requests using Axios.
4. When the access token expires, the frontend calls `/api/v1/auth/refresh` using the refresh token cookie to get a new access token.
5. Role-based routes (e.g., `/api/v1/users/**`) are protected and require the `ADMIN` role.

---

## ⚠️ Security Notes

- Never commit real client secrets, database passwords, or JWT secrets to version control.
- Use environment variables or a `.env` / secrets manager for all sensitive configuration.
- Set `cookie-secure: true` and an appropriate `cookie-same-site` policy in production (served over HTTPS).

---

## 📄 License

This project is open-source and available for learning purposes.
