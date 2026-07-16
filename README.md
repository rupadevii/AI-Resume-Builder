# AI Resume Builder

An AI-powered resume builder that helps users create, refine, and export professional resumes. Users enter their information, get AI-driven content enhancement with a word-level diff to review changes before accepting them, and choose from three design templates before printing.

🔗 **Live Demo:** [resume-builder-ecru-mu.vercel.app](https://resume-builder-ecru-mu.vercel.app)

---

## ✨ Features

- Improve resume content (e.g., summaries, experience descriptions) using the Gemini API
- Choose from three different resume templates/layouts
- Print or export the finished resume directly from the browser
- Real-time/live preview of the resume as the user edits
- Simple, guided form-based data entry flow
- Inline Diff Highlighting that visually highlights exactly which words/phrases were changed by the AI, making it easy to review and accept or reject edits at a glance
---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React, Tailwind CSS, React Router DOM, Lucide React (icons), React Modal, React-to-Print |
| **Backend** | Node.js, Express |
| **APIs** | Google Gemini API |
| **Libraries** | Axios (HTTP requests), dotenv (environment config), cors (CORS handling), react-to-print, diff (content comparison) |
| **Deployment** | Vercel |
| **Other Tools** | Vite, ESLint |

---

## 📁 Project Structure

```
AI-Resume-Builder/
├── api/                 # Express backend server (server.js) — handles Gemini API requests
├── public/              # Static assets
├── src/             # Application source code (components, pages, styles, etc.)
│   ├── components/  # Reusable components (layout, UI)
│   ├── pages/       # Page components
│   ├── context/     # Centralized state
│   ├── data/        # Dummy data
│   ├── utils/       # Helper functions
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── vercel.json          # Vercel deployment configuration
├── eslint.config.js     # ESLint configuration
├── package.json         # Project dependencies and scripts
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
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory and add the required variables (see [Environment Variables](#-environment-variables) below).

### 5. Run the development server
Run the frontend:
```bash
npm run dev
```
The app should now be running locally (default Vite port is `http://localhost:5173`).

Run the backend (from the `api/` directory):
```bash
cd api
node server.js
```

---

## 🔑 Environment Variables
| Variable | Description | Example Value |
|---|---|---|
| `GEMINI_API_KEY` | API key used to authenticate requests to the Google Gemini API (used server-side in `api/server.js`) | `your_gemini_api_key_here` |
| `PORT` | Port the Express backend server listens on | `5000` |

---

## 🚀 Usage

1. Open the application in your browser.
2. Select one of the three available resume templates.
3. Navigate through the guided flow to enter your personal, education, and work experience details into the resume form.
4. Click the AI enhancement option to refine your content — the backend sends your resume data to the Gemini API and returns improved wording.
5. Review the changes using the diff view, which highlights exactly what the AI modified compared to your original input.
6. Preview your final resume and use the Print option to generate a print-ready copy directly from the browser.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/refine-resume` | Accepts resume data as JSON, sends it to the Gemini API with a prompt instructing it to refine descriptions (summaries, project descriptions, achievements) for clarity, professionalism, and impact, and returns the refined resume JSON in the same structure. | No |

---

## 🏗 Architecture / Workflow

- **Request Flow:** The React frontend collects the user's resume data and sends it as JSON to the Express backend via `POST /api/refine-resume`. The backend builds a structured prompt, forwards it to the Gemini API, parses the AI's JSON response, and returns the refined resume data back to the frontend.
- **Authentication Flow:** Not implemented — all endpoints are currently open/unauthenticated.
- **Database Interaction:** None — the app does not persist data; resume data lives only in the frontend/session for the duration of use.
- **State Management:** > TODO: Add details (e.g., React Context, Redux, local component state)
- **Background Jobs:** None
- **External APIs:** Google Gemini API (`gemini-2.5-flash-lite` model via the `generateContent` endpoint) is used to rewrite resume descriptions with more professional, ATS-friendly language while preserving factual fields (names, dates, companies, links) and the original JSON structure.

## 🔮 Future Improvements

- Add more resume templates
- Add user accounts to save and manage multiple resumes
- Add rate limiting on `/api/refine-resume` to prevent Gemini API quota/cost abuse

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

---