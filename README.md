# 🎮 Gaming Quiz & Certificate Portal

An intelligent quiz platform designed for interactive learning, real-time assessment, and auto certificate generation. This system allows students to **join bootcamps**, **take quizzes**, and **earn certificates** — all guided by a smart AI chatbot and a powerful admin dashboard.

---

## 🧠 Overview

This is a full-stack education and assessment platform that blends **gamification**, **AI learning support**, and **automated certification**. Ideal for bootcamp-style learning, it provides **real-time scoring**, **progress tracking**, and **admin-controlled learning modules**.

---

## 🚀 Key Features

### ✅ For Students

- **🧩 Topic-wise Quizzes**  
  Participate in well-structured MCQ quizzes designed by experts.

- **📈 Real-time Score Calculation**  
  Your performance is scored instantly and submitted to the database with a timestamp.

- **🎓 Auto Certificate Generation**  
  Successfully complete a bootcamp quiz and get your certificate instantly.

- **📚 Bootcamp Enrollment**  
  Join multiple bootcamps to access curated learning resources and quizzes.

- **🤖 Gemini AI Chatbot Support**  
  Get personalized learning guidance powered by Google Gemini — including topic suggestions, doubts resolution, and learning paths.

---

### 🔐 For Admins & Student Coordinators

- **🧑‍💼 Role-Based Access Control**  
  Using cookies and session-based roles, differentiate between admin, student, and coordinator dashboards.

- **📂 Bootcamp Management**  
  Create new bootcamps, assign topics, set difficulty, and manage timelines.

- **📋 Question Management**  
  Add, edit, or remove quiz questions with options and correct answers.

- **🧑‍🎓 Student Coordinator Panel**  
  Assign coordinators to manage specific bootcamps and track student submissions.

- **📜 Certificate Generator**  
  Instantly generate and preview student certificates using built-in templates.

---

## ⚙️ Tech Stack

| Layer         | Technologies                          |
|---------------|---------------------------------------|
| Frontend      | React.js (Next.js), Tailwind CSS      |
| Backend       | Node.js (Express/FastAPI)             |
| Database      | MySQL + Firebase (for Auth & Storage) |
| Auth & Roles  | cookies-next, session                 |
| AI Assistant  | Google Gemini API                     |
| Deployment    | Netlify (Frontend) + Render (Backend) |

---

## 🧭 How It Works

1. Student logs in → Enrolls in bootcamp
2. Takes quiz → Scores are calculated
3. If passed → Certificate is auto-generated
4. Admin/Coordinator can monitor the entire flow

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/quiz-certificate-portal.git
cd quiz-certificate-portal
npm install
npm run dev
