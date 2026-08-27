# Task Manager — Frontend

React + TypeScript SPA for the Task Manager app (technical assessment project). Register/log in, then create, edit, delete, search, and filter your own tasks.

This is the frontend half of a two-repo submission. The backend lives at: https://github.com/mo2men-5aled/task-manager-server

## Tech Stack

React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query (server state), React Hook Form + Zod (form validation), axios.

## Project Structure

```
src/
  api/            axios client + auth/task HTTP calls
  context/        AuthContext (session state, token persistence)
  routes/         ProtectedRoute (auth guard)
  pages/          LoginPage, RegisterPage, TasksPage
  components/
    tasks/        TaskList, TaskCard, TaskFormModal, TaskFilters
    ui/           shared components (Button, Input, Select, Modal, Spinner, EmptyState, ErrorBanner)
  types/          shared TS types (Task, User, ...)
```

Data flow: `pages` (routed screens) → `components` (feature + shared UI) → `api` (HTTP calls) → `context` (auth/session state).

## Environment Variables

Copy `.env.example` to `.env`:

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API (e.g. `http://localhost:5000/api`, or the deployed Render URL + `/api`) |

## Running Locally

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`. Requires the backend running (see the server repo).

## Deploying (Vercel)

1. Import this repo into Vercel.
2. Framework preset: Vite.
3. Set environment variable `VITE_API_URL` to the deployed backend's URL + `/api` (e.g. `https://task-manager-server.onrender.com/api`).
4. Deploy. Once you have the Vercel URL, set it as `FRONTEND_URL` on the backend (Render) so CORS allows requests from it.

## Features

- Register/login, JWT session persisted in `localStorage`, protected `/tasks` route.
- Task board: create, edit, delete, search by title, filter by status/priority.
- Loading, error, empty-state, and inline validation feedback throughout.
- Responsive layout (mobile/desktop) via Tailwind.

## AI Tool Disclosure

Built with the assistance of Claude Code (Anthropic), with the author reviewing and understanding all code prior to submission.

## Known Issues / Not Implemented

- Drag-and-drop between statuses is not implemented — status is changed via the edit form.
- No pagination on the task list.
- No frontend test suite (backend has Jest/Supertest coverage — see the server repo).
