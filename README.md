# AI Resume Builder

An AI-powered resume builder that helps users create, refine, save, and export professional resumes. Users enter their information, get AI-driven content enhancement with a word-level diff to review changes before accepting them, choose from design templates, and can optionally create an account to save and manage multiple resumes.

🔗 **Live Demo:** [resume-builder-ecru-mu.vercel.app](https://resume-builder-ecru-mu.vercel.app)

---

## ✨ Features

- Improve resume content (e.g., summaries, experience descriptions) using the Gemini API
- Inline diff highlighting that visually highlights exactly which words/phrases were changed by the AI, making it easy to review changes before adopting them
- Choose from different resume templates/layouts, switchable anytime from the builder
- Optional accounts — use the app fully as a guest, and sign up/log in only when you want to save a resume
- Save, revisit, and manage multiple resumes from a dedicated "My Resumes" page
- Responsive resume preview that scales to fit smaller screens without reflowing the resume layout
- Print or export the finished resume directly from the browser
- Real-time/live preview of the resume as the user edits
- Simple, guided form-based data entry flow

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React, Tailwind CSS, React Router DOM, Redux Toolkit, Lucide React (icons), React Modal, React-to-Print |
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **Auth** | JWT-based authentication, optional/guest-friendly |
| **APIs** | Google Gemini API |
| **Libraries** | Axios (HTTP requests), dotenv (environment config), cors (CORS handling), react-to-print, diff (content comparison) |
| **Deployment** | Vercel (frontend), separately deployed Express backend |
| **Other Tools** | Vite, ESLint |

---

## 📁 Project Structure

The project is a monorepo with the frontend and backend in separate folders, deployed independently:

```
AI-Resume-Builder/
├── client/               # React frontend (Vite)
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable components (builder, preview, resumes, layout, UI)
│   │   ├── pages/        # Page components (BuilderPage, ResumesPage, etc.)
│   │   ├── context/      # Centralized resume data state
│   │   ├── redux/        # Redux Toolkit store (auth state)
│   │   ├── data/         # Dummy data
│   │   ├── utils/        # Helper functions
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json        # Vercel deployment configuration
│   └── package.json
├── server/                # Express backend
│   ├── models/            # Mongoose models (User, Resume)
│   ├── controllers/       # Route handlers (auth, resumes, AI refinement)
│   ├── routes/
│   ├── middleware/        # Auth middleware
│   └── package.json
├── eslint.config.js
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/rupadevii/AI-Resume-Builder.git
cd AI-Resume-Builder
```

### 2. Install dependencies

Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd server
npm install
```

### 3. Configure environment variables
Create a `.env` file in `client/` and another in `server/` with the required variables (see [Environment Variables](#-environment-variables) below).

### 4. Run the development servers

Frontend:
```bash
cd client
npm run dev
```
The app should now be running locally (default Vite port is `http://localhost:5173`).

Backend:
```bash
cd server
node server.js
```

---

## 🔑 Environment Variables

**Backend (`server/.env`)**

| Variable | Description | Example Value |
|---|---|---|
| `GEMINI_API_KEY` | API key used to authenticate requests to the Google Gemini API | `your_gemini_api_key_here` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret used to sign authentication tokens | `your_jwt_secret_here` |
| `PORT` | Port the Express backend server listens on | `5000` |

**Frontend (`client/.env`)**

| Variable | Description | Example Value |
|---|---|---|
| `VITE_API_URL` | Base URL of the deployed/local backend | `http://localhost:5000` |

---

## 🚀 Usage

1. Open the application in your browser.
2. Choose one of the three available resume templates (this can be changed anytime from the builder).
3. Navigate through the guided flow to enter your personal, education, and work experience details into the resume form.
4. Click the AI enhancement option to refine your content — the backend sends your resume data to the Gemini API and returns improved wording.
5. Review the changes using the diff view, which highlights exactly what the AI modified compared to your original input, and choose whether to adopt the AI-refined version.
6. Save your resume — if you're not logged in, you'll be prompted to sign up or log in first, and can then return anytime to view or edit it from "My Resumes."
7. Preview your final resume and use the Print option to generate a print-ready copy directly from the browser.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/ai/refine-resume` | Accepts resume data as JSON, sends it to the Gemini API with a prompt instructing it to refine descriptions (summaries, project descriptions, achievements) for clarity, professionalism, and impact, and returns the refined resume JSON in the same structure. | No |
| `POST` | `/auth/signup` | Creates a new user account. | No |
| `POST` | `/auth/login` | Authenticates a user and returns a JWT. | No |
| `GET` | `/auth/me` | Returns the currently authenticated user. | Yes |
| `GET` | `/resumes` | Lists all resumes belonging to the authenticated user. | Yes |
| `GET` | `/resumes/:id` | Fetches a single resume by ID (owner only). | Yes |
| `POST` | `/resumes` | Creates a new resume for the authenticated user. | Yes |
| `PATCH` | `/resumes/:id` | Updates an existing resume (owner only). | Yes |
| `DELETE` | `/resumes/:id` | Deletes a resume (owner only). | Yes |

---

## 🏗 Architecture / Workflow

- **Request Flow:** The React frontend collects the user's resume data and sends it as JSON to the Express backend via `POST /ai/refine-resume`. The backend builds a structured prompt, forwards it to the Gemini API, parses the AI's JSON response, and returns the refined resume data back to the frontend.
- **Authentication Flow:** JWT-based and fully optional — guests can use the entire builder and AI refinement flow without an account. Users are only prompted to sign up or log in when they attempt to save a resume. Once authenticated, a token is issued and used to authorize resume CRUD requests.
- **Database Interaction:** MongoDB (via Mongoose) stores user accounts and saved resumes. Each resume is scoped to its owning user; ownership is enforced on every read/update/delete request.
- **State Management:** Resume form data is managed via React Context (`InfoContext`); authentication state is managed with Redux Toolkit.
- **External APIs:** Google Gemini API (`gemini-2.5-flash-lite` model via the `generateContent` endpoint) is used to rewrite resume descriptions with more professional, ATS-friendly language while preserving factual fields (names, dates, companies, links) and the original JSON structure.

## 🔮 Future Improvements

- Add more resume templates
- Add rate limiting on `/api/refine-resume` to prevent Gemini API quota/cost abuse
- ATS score / job description matching
- Cover letter generation

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

---