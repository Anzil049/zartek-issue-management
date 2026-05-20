# IssueFlow MERN Issue Management Platform

IssueFlow is a practical Jira/Linear-style issue tracker with a React + TypeScript dashboard, Express REST API, MongoDB persistence, discussion threads, and Gemini-powered issue analysis.

## Stack

- Frontend: React, Vite, TypeScript, TailwindCSS, shadcn-style local UI primitives, React Router, TanStack Query, Axios, React Hook Form, Zod, Lucide icons
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, Zod, dotenv, CORS, Morgan, Swagger UI
- AI: Google Gemini SDK with structured JSON analysis and persisted results

## Setup

```bash
npm install
npm run install:all
```

Create environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Backend variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/issueflow
CLIENT_ORIGIN=http://localhost:5173
GEMINI_API_KEY=
GEMINI_MODEL=gemini-flash-latest
```

Frontend variables:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

Start MongoDB locally, then run:

```bash
npm run dev
```

Seed realistic issues and comments:

```bash
npm run seed
```

Open:

- Frontend: http://localhost:5173
- API: http://localhost:5000/api
- Swagger: http://localhost:5000/api/docs

## Scripts

Root:

- `npm run install:all` installs backend and frontend packages
- `npm run dev` runs both apps together
- `npm run build` builds both apps
- `npm run lint` lints both apps
- `npm run seed` loads seed data

Backend:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run seed`

Frontend:

- `npm run dev`
- `npm run build`
- `npm run preview`

## Architecture

```text
backend/src
  ai/             Gemini integration and structured analysis parsing
  config/         environment, MongoDB, Swagger config
  controllers/    request handlers
  middleware/     error and not-found handling
  models/         Mongoose Issue and Comment schemas
  routes/         REST route composition
  scripts/        seed script
  services/       database/business logic
  types/          shared backend domain types
  validators/     Zod request schemas
  utils/          async and HTTP helpers

frontend/src
  api/            reusable Axios client
  components/     reusable UI, cards, forms, loading and empty states
  context/        theme provider
  hooks/          TanStack Query hooks and mutations
  layouts/        dashboard shell
  pages/          route screens
  routes/         React Router configuration
  services/       API service layer
  styles/         Tailwind globals
  types/          frontend domain types
```

## API

- `GET /api/issues` list issues with optional `status`, `priority`, `search`
- `POST /api/issues` create issue
- `GET /api/issues/:id` fetch issue details
- `PATCH /api/issues/:id` update issue fields
- `DELETE /api/issues/:id` delete issue and comments
- `GET /api/issues/:id/comments` list comments
- `POST /api/issues/:id/comments` add comment
- `POST /api/issues/:id/analyze` generate and persist Gemini analysis

## AI Integration Flow

1. User clicks `Generate` on the issue details page.
2. Frontend calls `POST /api/issues/:id/analyze`.
3. Backend loads the issue and all comments.
4. `gemini.service.ts` sends a structured prompt to Gemini requesting JSON with summary, possible root cause, severity assessment, and suggested fixes.
5. The response is parsed with Zod, stored on the issue as `aiAnalysis`, and returned to the UI.
6. If `GEMINI_API_KEY` is not configured, the API stores a clear fallback analysis so the workflow remains testable.

## Screenshots

Add screenshots after running the app:

- `docs/screenshots/issues-dashboard.png`
- `docs/screenshots/issue-detail-ai.png`
- `docs/screenshots/new-issue-form.png`
