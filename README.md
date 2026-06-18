# 🚀 HireVerse - Premium Job Portal Application

HireVerse is a modern, full-stack (MERN) job portal application designed to bridge the gap between job seekers and employers. Built with a powerful backend and a highly interactive, responsive frontend, HireVerse provides a seamless experience for finding jobs, managing company profiles, posting vacancies, and tracking applications in real time.

---

## 🌟 Key Features

### 👤 For Job Seekers (Candidates)
- **Interactive Dashboard:** View and search latest jobs with advanced filtering.
- **Search & Filter:** Filter jobs by location, industry, salary, and job type.
- **Profile Management:** Set up a detailed profile, edit personal details, and upload/update resumes.
- **Application Tracking:** Apply to jobs with a single click and track application status (Pending, Shortlisted, Rejected).

### 🏢 For Recruiters & Admins
- **Company Management:** Create and configure multiple company profiles, including logos, descriptions, websites, and office locations.
- **Job Posting Panel:** Post detailed job descriptions with salary range, role requirements, experience level, job type, and vacancy count.
- **Applicant Tracking System (ATS):** View all candidates who applied for a job, check their profiles/resumes, and update their application status in real time.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 (Vite)
- **State Management:** Redux Toolkit & React-Redux
- **Styling:** Tailwind CSS (v4)
- **Navigation:** React Router DOM (v7)
- **Icons:** Lucide React
- **Notifications:** Sonner (Toast notifications)
- **API Client:** Axios (with credentials configuration)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) stored in HTTP-Only cookies
- **Security:** BcryptJS for password hashing, CORS for secure cross-origin requests
- **Utility:** Cookie Parser, Dotenv, Nodemon

---

## 📂 Project Structure

```text
HireVerse/
├── backend/
│   ├── controllers/      # Route controller functions (user, company, job, application)
│   ├── middleware/       # Authentication and request validation middleware
│   ├── models/           # Mongoose schemas (User, Company, Job, Application)
│   ├── routes/           # API routes definitions
│   ├── utils/            # DB connection helper & configuration
│   ├── index.js          # Backend entry point
│   └── .env              # Backend environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components & Admin tables
│   │   ├── hooks/        # Custom React queries/hooks (fetching jobs, companies, etc.)
│   │   ├── pages/        # Page views (Home, Profile, Login, Signup, Admin dashboard)
│   │   ├── redux/        # Redux slices and store configuration
│   │   ├── utils/        # Axios configurations and constants
│   │   └── main.jsx      # React entry point
│   ├── vite.config.js    # Vite configuration with API Proxy setup
│   └── package.json
│
├── package.json          # Root scripts to run both apps concurrently
└── README.md             # Project documentation (You are here!)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or above recommended)
- **npm** (v9.x or above)
- **MongoDB Atlas** account or a local MongoDB community server running.

### 1. Clone the Repository
```bash
git clone https://github.com/abhishekverma018/HireVerse.git
cd HireVerse
```

### 2. Install Dependencies
Install dependencies for the root helper, backend, and frontend:
```bash
# Install root workspace dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Return to root directory
cd ..
```

### 3. Environment Setup
Create a `.env` file inside the `backend` directory:
```bash
touch backend/.env
```
### 4. Run the Application
You can run both the frontend and backend servers concurrently with a single command from the root directory:
```bash
npm run dev
```

- **Frontend** runs on: [http://localhost:5173](http://localhost:5173)
- **Backend** runs on: [http://localhost:8000](http://localhost:8000)

---

## 🔌 API Reference

### Auth & User Routes (`/api/v1/user`)
- `POST /register` - Register a new user (Candidate or Recruiter).
- `POST /login` - Log in a user.
- `GET /logout` - Log out a user (clears HTTP-Only cookie).
- `POST /profile/update` - Update user profile details (requires authentication).

### Company Routes (`/api/v1/company`)
- `POST /register` - Register a new company.
- `GET /get` - Get all companies registered by the logged-in admin.
- `GET /get/:id` - Get company details by ID.
- `PUT /update/:id` - Update company details.

### Job Routes (`/api/v1/job`)
- `POST /post` - Post a new job (Admin only).
- `GET /get` - Get all available jobs.
- `GET /getadminjobs` - Get all jobs posted by the logged-in admin.
- `GET /get/:id` - Get job details by ID.

### Application Routes (`/api/v1/application`)
- `POST /apply/:id` - Apply for a job.
- `GET /get` - Get all jobs applied by the current user.
- `GET /:id/applicants` - Get all applicants for a specific job (Admin only).
- `POST /status/:id/update` - Update applicant status (Shortlisted, Rejected, etc.).

---

## 🔒 Security & Best Practices
- **Password Hashing:** Passwords are securely hashed using `bcryptjs` before being stored in the database.
- **Token-based Authentication:** Standard JWT-based token generation for verifying sessions.
- **HTTP-Only Cookies:** Auth tokens are stored in secure HTTP-Only cookies to protect against XSS attacks.
- **Route Protection:** Route-level middleware ensures only authenticated users/recruiters can perform sensitive operations.

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

---

## 📄 License
This project is licensed under the ISC License.
