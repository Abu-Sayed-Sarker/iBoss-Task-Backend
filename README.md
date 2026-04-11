# iBoss-Task Backend - Online Test Management System

A robust and scalable backend system for managing online tests, questions, and exam participation. Built for recruitment, assessment, or educational purposes.

## 🚀 Features

### 👤 User Authentication
- **Secure Auth**: JWT-based authentication with Access and Refresh tokens.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `Admin` and `User` roles.
- **Profile Management**: Secure endpoints for registration, login, and profile retrieval.

### 📝 Test Management (Admin Only)
- **CRUD Operations**: Create, Read, Update, and Delete tests.
- **Rich Metadata**: Manage test titles, candidate estimates, start/end times, and duration.
- **Analytics**: Real-time tracking of submission counts for each test.

### ❓ Question Management (Admin Only)
- **MCQ Support**: Comprehensive support for Multiple Choice Questions.
- **Targeted Management**: Add, update, or remove questions for specific tests.
- **Point System**: Assign customizable points to each question for automated scoring.

### ✍️ Exam Participation (User Side)
- **Step-by-Step Exam**: Start exams and submit answers question-by-question (standard assessment flow).
- **Automated Scoring**: Instant feedback and score calculation upon exam completion.
- **State Persistence**: Tracks exam progress (`started_at`, `submitted_at`) and prevents duplicate submissions.
- **Submission Flags**: Users can see which tests they've already completed (`is_submitted` flag).

### 📖 API Documentation
- **Swagger/OpenAPI Integrated**: Full interactive API documentation available at `/api/docs`.

---

## 🛠 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Database Client**: `pg` (node-postgres)
- **Security**: JWT (jsonwebtoken), bcryptjs, CORS
- **Documentation**: Swagger UI Express, OpenAPI 3.0

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Abu-Sayed-Sarker/iBoss-Task-Backend.git
cd iBoss-Task-Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=iboss_task
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
API_BASE_URL=http://localhost:5000
```

### 4. Database Initialization
The system uses an **Auto-Migration** pattern. On the first run, it will automatically create the necessary tables (`users`, `tests`, `questions`, `user_exams`, `user_answers`).

### 5. Run the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 🐳 Docker Setup (Recommended)
The easiest way to run the application and the database together is using Docker.

1. **Build and start services**:
   ```bash
   docker-compose up --build
   ```
2. **Access the API**: The app will be available at `http://localhost:5001`.
3. **Database**: PostgreSQL will be running on port `5432` with a persistent volume.

---

## 🛣 API Endpoints (Quick Overview)

### Auth
- `POST /api/auth/register` - Create new user/admin
- `POST /api/auth/login` - Authenticate and get tokens
- `GET /api/auth/profile` - Get current user data

### Tests
- `GET /api/tests/all` - List all tests (includes questions and user submission status)
- `GET /api/tests/:id` - Get specific test details with questions
- `POST /api/tests/add` - Create a new test (Admin)
- `PATCH /api/tests/update/:id` - Update test info (Admin)
- `DELETE /api/tests/delete/:id` - Remove a test (Admin)

### Questions
- `POST /api/questions` - Add question to a test (Admin)
- `PATCH /api/questions/:id` - Update question (Admin)
- `DELETE /api/questions/:id` - Remove question (Admin)

### Exams
- `POST /api/exams/start` - Initialize an exam session
- `POST /api/exams/submit-answer` - Save an answer for a question
- `POST /api/exams/finalize` - Submit exam and calculate results
- `GET /api/exams/my-results` - View user's performance history

---

## 📈 Database Schema

The project follows a relational structure optimized for performance:
- **Users**: Core identity.
- **Tests**: Root evaluation containers.
- **Questions**: Individual items linked to tests (1:N).
- **UserExams**: High-level tracking of a user's attempt at a test.
- **UserAnswers**: Granular tracking of user response to specific questions (M:N).

---

## 👤 Author

**Abu Sayed Sarker**
- GitHub: [@Abu-Sayed-Sarker](https://github.com/Abu-Sayed-Sarker)
- Portfolio: [abusayedsarker.com](https://abusayedsarker.com)

---

## ⚖️ License
This project is for interview assessment purposes only.
