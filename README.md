# Task Management Portal (MERN Stack)

**Candidate**: Harsh Bediya  
**Assignment**: Task Management Portal Developer Evaluation  
**Contact**: harshbedi3112@gmail.com

A premium, glassmorphic Task Management Portal built with **NestJS** (Backend) and **React/Vite** (Frontend). This full-stack application utilizes **MongoDB** for persistence and **JWT authentication** to ensure secure, user-specific task management following scalable architecture principles.

## 🚀 How to Run

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://localhost:27017/task-portal`)

### Backend Setup
1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. The `.env` file is already created. You can modify it if needed.
4. Run the server: `npm run start:dev`

### Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

---

## 🤖 AI Prompts Used
1. "Build a simple Task Management Portal using the MERN stack."
2. "Create a premium dark/glassmorphic CSS design for the Task Portal."
3. "Implement JWT authentication in NestJS with Passport."
4. "Create a React Dashboard with task filtering and status toggling."

## 🧱 What AI Generated vs What was Modified
- **AI Generated**: Core architecture, NestJS modules/services, React component structures, and initial styling.
- **Modified**: 
    - Fixed Vite template issues (manual conversion from Vanilla TS to React JSX).
    - Integrated Tailwind-like utility names into custom CSS for a cleaner project.
    - Simplified the state management to use React Context for better clarity as requested.
    - Enhanced the Task schema to include `userId` for proper ownership.

## 🧠 Code Explanation [NON AI GENERATED]

### Backend (NestJS)
- **Modular Architecture**: The backend is organized into modules (`Auth`, `Users`, `Tasks`). Each module has its own controller, service, and schema, following NestJS best practices for scalability.
- **Security**: 
    - **Password Hashing**: Uses `bcrypt` to hash passwords before storing them in MongoDB.
    - **JWT Authentication**: Implements Passport.js with a JWT strategy. All task-related endpoints are protected by an `AuthGuard`.
    - **Ownership Check**: Every task is linked to a `userId`. The service ensures that users can only view, update, or delete their own tasks.
- **Data Validation**: Uses `class-validator` and DTOs (Data Transfer Objects) to ensure incoming data meets the required structure and types.

### Frontend (React + Vite)
- **Component-Based UI**:
    - `TaskForm`: Handles task creation with title, description, and priority selection.
    - `TaskItem`: A reusable component to display individual tasks with status toggling and deletion.
    - `Dashboard`: The main layout that orchestrates state, filtering, and stats.
- **Glassmorphic Design**: Uses vanilla CSS with modern properties like `backdrop-filter` and `radial-gradient` to achieve a premium, semi-transparent look.
- **Performance**: Uses optimistic UI updates where possible (e.g., toggling status) for a lag-free experience.

## 📡 API Design [NON AI GENERATED]
All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and get JWT token | No |
| GET | `/auth/profile` | Get current user's profile | Yes |
| GET | `/tasks` | Get all tasks for logged-in user (optional `?status=pending`) | Yes |
| POST | `/tasks` | Create a new task (Title, Desc, Priority) | Yes |
| PATCH | `/tasks/:id` | Update task details | Yes |
| PATCH | `/tasks/:id/toggle` | Toggle task status (Pending <-> Completed) | Yes |
| DELETE | `/tasks/:id` | Delete a task | Yes |

## 🧠 State Management [NON AI GENERATED]
- **Auth State**: Managed using **React Context API** (`AuthContext.jsx`). This provides a global `user` object and `login/logout/register` functions. It also handles session persistence via `localStorage`.
- **Task State**: Managed locally in `Dashboard.jsx` using `useState`. This keeps the data flow simple: `Dashboard` fetches data and passes it down to components, while child components trigger callbacks up to the parent.
- **Filtering**: Implemented as a piece of state (`filter`) that triggers a re-fetch of tasks with the appropriate query parameter whenever it changes.

---
**Candidate**: Harsh Bediya  
**Contact**: harshbedi3112@gmail.com  
**HR Contact**: Aditi Rajput (KATYAYANI ORGANICS)
