# CareerSync AI — Intelligent Career Readiness Platform (MERN)

CareerSync AI is a full-stack MERN application that evaluates student technical competencies, extracts resume skills using PDF text parsing, calculates weighted skill gaps against real industry roles, builds personalized learning roadmaps, conducts verified MCQ assessments, and offers an AI career advisor.

---

## Architecture Overview

| Technology | Role in CareerSync AI |
| :--- | :--- |
| **React.js 18 + Vite** | High-performance SPA with client routing, Lucide icons, and Recharts analytics |
| **Node.js** | Non-blocking backend execution environment |
| **Express.js** | Modular RESTful API framework with middleware authentication |
| **MongoDB & Mongoose**| Document store for Users, Profiles, Job Roles, Resumes, Roadmaps, and Assessments |
| **JWT (JSON Web Token)** | Secure stateless token-based authentication |
| **bcryptjs** | Salted cryptographic password hashing (cost factor 12) |
| **Multer + pdf-parse** | PDF resume file upload & NLP keyword text extraction engine |
| **Recharts** | Interactive Radar & Bar charts for skill gap visualization |

---

## Project Structure

```
CareerSync-AI/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Dynamic nav with Auth State & Badges
│   │   │   ├── Sidebar.jsx         # Student Portal Navigation
│   │   │   ├── SkillCard.jsx       # Reusable Skill Gap Card
│   │   │   └── ProtectedRoute.jsx  # Route guard for authenticated students
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing Page with Blueprint & Features
│   │   │   ├── Signup.jsx          # Student Account Registration
│   │   │   ├── Login.jsx           # Student Authentication
│   │   │   ├── Dashboard.jsx       # Analytics & Recharts Skill Radar
│   │   │   ├── Profile.jsx         # Profile Management & Skills Editor
│   │   │   ├── ResumeAnalyzer.jsx  # Multer & PDF text extraction
│   │   │   ├── ExploreCareers.jsx  # 5+ Benchmark Tech Roles
│   │   │   ├── SkillGap.jsx        # Weighted Matching Algorithm Engine
│   │   │   ├── Roadmap.jsx         # Personalized Curriculum & Milestones
│   │   │   ├── Assessment.jsx      # Backend-Validated MCQ Tests
│   │   │   └── Chatbot.jsx         # AI Career Advisory Assistant
│   │   ├── services/
│   │   │   └── api.js              # Axios instance with JWT interceptors
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global User & Session State
│   │   ├── App.jsx                 # Central Route Configuration
│   │   ├── main.jsx                # React DOM Mount
│   │   └── index.css               # Clean Modern Design System
│   └── package.json
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB Atlas / In-Memory Auto-Connector
│   ├── models/
│   │   ├── User.js                 # Authentication Credentials
│   │   ├── Profile.js              # Student Academic & Skill Profile
│   │   ├── JobRole.js              # Target Career Benchmark Criteria
│   │   ├── Resume.js               # Parsed PDF Text & Extracted Skills
│   │   ├── SkillGap.js             # Computed Gap Analysis Reports
│   │   ├── Assessment.js           # MCQ Question Bank & Mastery Levels
│   │   └── Roadmap.js              # Customized Learning Milestones
│   ├── controllers/
│   │   ├── authController.js       # Signup, Login, and Session Verification
│   │   ├── profileController.js    # Student Profile Management
│   │   ├── careerController.js     # Benchmark Careers & Auto-Seeding
│   │   ├── skillController.js      # Skill Gap Engine Execution
│   │   ├── resumeController.js     # Multer & pdf-parse Extraction
│   │   ├── roadmapController.js    # Milestone Generation & Updates
│   │   ├── assessmentController.js # Cheat-proof MCQ Evaluator
│   │   ├── chatController.js       # Career AI Advisory Engine
│   │   └── dashboardController.js  # Aggregated Metrics & Charts API
│   ├── routes/
│   │   └── [All Corresponding Express Routers]
│   ├── middleware/
│   │   └── authMiddleware.js       # Bearer Token Authorization Guard
│   ├── utils/
│   │   └── skillAnalyzer.js        # Core Gap & Readiness Scoring Math
│   ├── test_api.js                 # Automated API Test Suite
│   ├── server.js                   # Server Entry & Route Registrations
│   └── .env                        # Environment Configuration
├── CareerSync-AI-Postman-Collection.json # Importable Postman Test Suite
└── README.md
```

---

## Milestone 1 — Status: Completed 

- [x] **Project Scaffolding**: Structured separate `frontend/` and `backend/` environments.
- [x] **React Setup**: Vite 5 + React 18 with routing, context, modern styling, and Lucide icons.
- [x] **Express Backend**: Configured with CORS, JSON body parsers, and error handlers.
- [x] **MongoDB Integration**: Flexible database connector that connects to MongoDB Atlas or local DB, with an automatic in-memory fallback for instant zero-config testing.
- [x] **Landing Page (`Home.jsx`)**: Comprehensive showcase of features, architecture, and value proposition.
- [x] **Signup & Login (`Signup.jsx`, `Login.jsx`)**: Full student registration with bcrypt hashing, JWT issuance, and automatic token interceptors.
- [x] **Postman & Automated Testing**: Included `CareerSync-AI-Postman-Collection.json` and executed 7/7 passing backend tests.

---

## Getting Started

### 1. Run the Backend Server
```bash
cd backend
npm run dev
```
*Server starts at `http://localhost:5000`.*

### 2. Run the React Frontend
In a separate terminal:
```bash
cd frontend
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

### 3. Run Automated Authentication & API Tests
```bash
cd backend
node test_api.js
```

### 4. Postman Testing
- Open **Postman**.
- Click **Import** and select `CareerSync-AI-Postman-Collection.json`.
- Test `01. Health Check`, `02. Student Signup`, `03. Student Login`, `04. Get Current User`, and beyond. The signup/login requests automatically store your JWT in the collection variable `{{authToken}}`!
