# 🧠 Kanban Board - Full Stack App

A full-stack Kanban board application built with modern web technologies, having a simple and responsive UI.

🔗 **Live Demo**: [https://kanban-boardz.netlify.app](https://kanban-boardz.netlify.app)

## 🚀 Tech Stack

### Frontend
- ⚛️ **React** with **TypeScript**
- 🎨 **Tailwind CSS** for styling
- 🧩 **Dnd Kit** for drag-and-drop interactions
- 🧠 **Zustand** for global state management
- 🔍 **TanStack Query (React Query)** for data fetching & caching
- 🌐 **Axios** for HTTP requests

### Backend
- 🟩 **Node.js** with **Express**
- 📦 **TypeScript** for type safety
- 🗃️ **PostgreSQL** for the database
- 🧬 **Drizzle ORM** for schema-safe DB access
- ✅ **Zod** for schema validation and input sanitization

## Follow the steps below to set up and run this project locally
- clone the repo
- add .env file in the root of the client folder with the following contents
   - `VITE_API_BASEURL=http://localhost:5000/api`
- add .env file in the root of the server folder with the following contents
  - `PORT=5000`
  - `DB_URL= local postgres URL or any online provider (like Neon Postgres) URL here`
  - `JWT_SECRET_KEY= any random secret`
  - `REFRESH_TOKEN_SECRET=  any random secret1`
  - `TOKEN_LIFE=1h`
  - `REFRESH_TOKEN_LIFE=7d`
- after setting up the environments in the server and client, it's time to run migrations for the models
- navigate to the server folder in the terminal and run the following commands
  - `npx drizzle-kit generate` (generates schema migrations)
  - `npx drizzle-kit push` (push migrations and sync with database)
- after the above steps, it's time to run the project. We run client and server projects separately in two terminals for better debugging
- open one terminal at the client folder and another at the server folder
- run `npm i` in both terminals to install all necessary packages
- after the above step, run the same command in both terminals: `npm run dev`
- that's it, now you can test the app and check their logs and debug them separately in their respective terminals
