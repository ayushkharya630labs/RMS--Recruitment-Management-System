# 🚀 RMS – Recruitment Management System

AI-powered recruitment workflow automation system designed to streamline CV parsing, candidate profiling, AI-based scoring, and job-to-CV matching inside a single platform.  
The project is currently under active backend development, with frontend modules progressing in parallel.

---

## ⚡ System Flow (Short Summary)

RMS automates the recruitment lifecycle:

1️⃣ **Create Job (Upload JD)**  
Recruiter uploads a Job Description → AI extracts job details & keywords.

2️⃣ **Upload CVs for that Job**  
Multiple CVs can be uploaded → AI parses resume content.

3️⃣ **AI CV Parsing & Profile Extraction**  
AI reads CV → extracts candidate details, skills, experience, education, etc.

4️⃣ **AI Job-Match Scoring**  
AI compares CV vs Job → generates:
- Skill Match %
- Experience Match %
- Overall Score
- Recommendation (Shortlist / Average / Reject)

5️⃣ **Store Candidate + AI Report in Database**  
Candidate profile + parsed data + AI score are saved for reuse.

6️⃣ **Candidate Database & Shortlisting**  
Recruiter can view, sort, filter, delete, or reuse candidate records.

👉 In simple terms —  
**Upload JD → Upload CVs → AI analyzes → Score generated → Stored in Candidate DB**

---

## 🧩 Project Structure

```
RMS--Recruitment-Management-System
│
├── server   → Backend (Node.js + TypeScript + MySQL + Sequelize)
└── client   → Frontend (React + Vite + TypeScript + Tailwind CSS)
```

---

## 📌 Development Status

### 🟢 Backend – Active Development

Features in progress:
- CV Upload & Parsing  
- AI-based Candidate Profiling  
- Job-to-CV Match Scoring  
- Candidate Database Storage  
- Shortlisting & Ranking Engine  

**Backend Tech Stack**
- Node.js  
- TypeScript  
- Express.js  
- Sequelize ORM  
- MySQL  
- Multer (file uploads)  
- Groq / AI Integration 

---

### ⏳ Frontend – Development in Progress

Frontend UI modules will expand as backend workflows stabilize.

**Frontend Tech Stack**
- React (Vite)  
- TypeScript  
- Tailwind CSS  
- React Icons  

---

## 📥 Clone the Repository

```bash
git clone https://github.com/ayushkharya630labs/RMS--Recruitment-Management-System.git
```

---

## ⚙️ Backend Setup

```bash
cd RMS--Recruitment-Management-System/server
npm install
npm run dev
```

Backend automatically syncs Sequelize models with MySQL.

---

## 🔧 Environment Configuration

Create `.env` file inside **server** folder:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=rms_db

GROQ_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
```

> Make sure MySQL is running before starting the backend.

---

## 🎨 Frontend Setup

```bash
cd RMS--Recruitment-Management-System/client
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🗺️ Roadmap

- [ ] AI CV Parsing & Structured Candidate Profiles  
- [ ] AI Job-Match Scoring Engine  
- [ ] Candidate Database & Analytics  
- [ ] JD-Based Shortlisting Pipeline  
- [ ] Recruiter Dashboard  
- [ ] Role-Based Access Control  
- [ ] Reporting & Data Export  

---

## 🤝 Contribution

Project is under active development.  
Contribution access will open after core workflows stabilize.

---

## 🛡️ License

Currently not licensed for commercial deployment.  
License will be updated once project matures.

---

## ❤️ Credits

Built with the vision to create a **smart, scalable, AI-driven Recruitment Automation Platform**.
