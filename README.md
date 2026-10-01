# Devansh Insurance Q&A Chatbot

A small insurance information website with a React frontend and a FastAPI chatbot backend. The chatbot sends questions to the backend, which calls the Groq API using the OpenAI-compatible client. If the backend cannot be reached, the frontend falls back to simple keyword-based answers.

## Project structure

```text
.
|-- .gitignore                         # Ignores secrets, virtual environments, dependencies, and build output
|-- README.md                          # Project setup and deployment guide
|-- render.yaml                        # Render Blueprint defining frontend and backend services
|-- package.json                       # Root-level npm dependency manifest (frontend scripts are in chatbot/package.json)
|-- package-lock.json                  # Lockfile for the root-level npm manifest
|-- .venv/                             # Optional root-level Python environment; generated, do not commit
|-- node_modules/                      # Optional root-level Node dependencies; generated, do not commit
|-- backend/
|   |-- main.py                        # FastAPI app, company prompt, CORS, GET / and POST /chat
|   |-- requirements.txt               # Python packages required by the API
|   |-- .env.example                   # Safe template for local backend settings
|   |-- .env                           # Local secrets/settings; create from .env.example, do not commit
|   |-- .venv/                         # Local Python virtual environment; generated, do not commit
|   `-- __pycache__/                   # Python bytecode cache; generated, do not commit
`-- chatbot/
    |-- index.html                     # Vite HTML entry point and page metadata
    |-- package.json                   # Frontend scripts and dependencies
    |-- package-lock.json              # Locked frontend dependency versions used by npm ci
    |-- vite.config.js                  # Vite configuration and React compiler plugins
    |-- eslint.config.js                # ESLint rules for JavaScript and React
    |-- .env.example                   # Local frontend API URL template
    |-- .env.local                     # Optional local Vite variables; create from .env.example, do not commit
    |-- README.md                      # Original Vite template notes
    |-- public/
    |   |-- favicon.svg                # Browser tab icon
    |   `-- icons.svg                  # Shared SVG icon definitions
    `-- src/
        |-- main.jsx                   # React application mount point
        |-- App.jsx                    # Routes and shared page layout
        |-- App.css                    # Site, page, widget, and responsive styles
        |-- index.css                  # Global reset and base styles
        |-- components/
        |   |-- Chatbot.jsx            # Chat UI, API request, and local fallback answers
        |   |-- ChatWidget.jsx         # Floating open/close chat control
        |   |-- CompanyCard.jsx        # Reusable company metric card
        |   |-- Footer.jsx             # Site footer and contact details
        |   `-- Navbar.jsx             # Navigation links and demo login state
        |-- data/
        |   `-- companyData.js         # Company content, products, values, and suggested questions
        `-- pages/
            |-- Home.jsx               # Landing page
            |-- About.jsx              # Company information page
            |-- Services.jsx           # Insurance products page
            |-- Contact.jsx            # Contact details, map, and demo form
            `-- Login.jsx              # Demonstration login page
```

Generated folders such as `node_modules/`, `chatbot/node_modules/`, `chatbot/dist/`, `.venv/`, and Python cache files are created during installation or build and are not part of the source tree. The root `.gitignore` excludes common generated files and `.env` secrets.

### Request flow

1. `chatbot/src/components/Chatbot.jsx` sends the conversation to `${VITE_API_URL}/chat`.
2. `backend/main.py` validates the request, adds the company information prompt, and calls Groq.
3. The API returns a reply to the frontend. If the request fails, the frontend uses its local keyword fallback.

## Requirements

- Python 3.12 or a compatible Python 3 version
- Node.js and npm
- A Groq API key and a model ID available to your Groq account to use AI answers

## Run locally

### 1. Configure the backend

In PowerShell, from the project root:

```powershell
Copy-Item backend/.env.example backend/.env
```

Edit `backend/.env` and provide your Groq credentials/model:

```dotenv
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model_id
FRONTEND_URL=
```

Keep the real `.env` file private. It is excluded from Git by `.gitignore`.

Install and start the backend:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API health check is available at `http://localhost:8000/`. The chatbot endpoint is `POST http://localhost:8000/chat`.

### 2. Configure and start the frontend

Open a second PowerShell terminal from the project root:

```powershell
Copy-Item chatbot/.env.example chatbot/.env.local
cd chatbot
npm ci
npm run dev
```

The example frontend environment sets `VITE_API_URL=http://localhost:8000`. If you change the backend address, update `chatbot/.env.local` and restart Vite. Open the URL printed by Vite, usually `http://localhost:5173`.

## Deploy to Render

The root `render.yaml` defines two Render services:

- `devansh-backend`: Python web service running FastAPI with Uvicorn.
- `devansh-frontend`: static site built with Vite. A rewrite serves the React app for client-side routes.

### 1. Push the project to GitHub

Commit and push the project to a GitHub repository that Render can access. Before committing, check that real environment files and API keys are not included:

```powershell
git status
```

`backend/.env` and `chatbot/.env.local` should remain untracked/ignored. Commit the example files instead.

### 2. Create the Render services

1. Sign in to Render and choose **New + > Blueprint**.
2. Connect GitHub if asked, then select the repository containing `render.yaml` at its root.
3. Review the two services and choose **Apply**.
4. When prompted, enter the environment values below. Render stores these values in the service environment; do not put secrets in `render.yaml` or Git.

| Service  | Variable       | Value                                                                                                |
| -------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| Backend  | `GROQ_API_KEY` | Your private Groq API key                                                                            |
| Backend  | `GROQ_MODEL`   | A model ID enabled for your Groq account                                                             |
| Backend  | `FRONTEND_URL` | The deployed frontend URL, such as `https://devansh-frontend.onrender.com`, without a trailing slash |
| Frontend | `VITE_API_URL` | The deployed backend URL, such as `https://devansh-backend.onrender.com`, without a trailing slash   |

The backend's `FRONTEND_URL` and frontend's `VITE_API_URL` must use the actual URLs Render assigns. If one service URL is not known yet, deploy both, set the correct values in each service's **Environment** page, then redeploy. `VITE_API_URL` is embedded in the frontend during its build, so changing it requires a frontend redeploy.

### 3. Confirm deployment

- Open the backend URL with `/` appended. It should return `{"status":"ok"}`.
- Open the frontend URL and navigate through the pages. The Blueprint includes a rewrite for React Router URLs.
- Send a chatbot question. If it uses local fallback answers, check the browser console and Render backend logs, then confirm the two service URLs and Groq variables are correct.

## Environment variables

| Variable       | Used by  | Purpose                                                                                 |
| -------------- | -------- | --------------------------------------------------------------------------------------- |
| `GROQ_API_KEY` | Backend  | Authenticates requests to Groq. Keep this secret.                                       |
| `GROQ_MODEL`   | Backend  | Selects the Groq model for chat completions.                                            |
| `FRONTEND_URL` | Backend  | Adds the deployed frontend origin to the backend CORS allowlist.                        |
| `VITE_API_URL` | Frontend | Base URL for the backend API. Vite embeds this value at build time; it is not a secret. |

The backend allows the local Vite development origins in addition to the configured `FRONTEND_URL`.

## Useful commands

Run from `chatbot/`:

```powershell
npm run dev       # Start Vite development server
npm run build     # Create production files in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

Run from `backend/` to start the API locally:

```powershell
uvicorn main:app --reload --port 8000
```

## Current limitations

- The login page is a frontend demonstration; it does not authenticate users or store accounts.
- The contact form only displays a confirmation in the browser; it does not send or save submissions.
- The contact details and some company figures in `chatbot/src/data/companyData.js` are identified in the source as dummy/demo content. Verify them before publishing publicly.
- The chatbot answers from the company information embedded in `backend/main.py`; update that content when company information changes.

## Troubleshooting

- **Chat responds with fallback answers:** Check that the backend is deployed and that `VITE_API_URL` points to its base URL with no `/chat` suffix. Check Render backend logs for Groq configuration or API errors.
- **Browser reports a CORS error:** Set backend `FRONTEND_URL` to the exact frontend origin (`https://...onrender.com`), without a path or trailing slash, then redeploy the backend.
- **Backend fails to start:** Confirm `GROQ_API_KEY` and `GROQ_MODEL` are present in the backend service environment. The key must be valid and the model available to your account.
- **Frontend routes show a 404 after refresh:** Confirm the frontend was created from the repository Blueprint and its SPA rewrite rule is present.
- **Frontend still calls the previous backend:** Update `VITE_API_URL` in the frontend service settings and trigger a new frontend deploy; Vite reads it during build.
