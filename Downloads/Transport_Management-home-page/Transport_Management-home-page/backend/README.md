# Backend - Auth (MongoDB Atlas)

This backend provides simple signup/login JWT auth using MongoDB (Atlas) via Mongoose.

Environment variables (see `.env.example`):

- `MONGODB_URI` - your MongoDB Atlas connection string
- `JWT_SECRET` - secret for signing JWT tokens
- `FRONTEND_ORIGIN` - optional, frontend origin for CORS (default `http://localhost:5173`)

Quick start:

```bash
cd backend
npm install
# create a .env file with values from .env.example
npm run dev
```

API endpoints:

- `POST /api/auth/signup` { name, email, password, role } -> { token, role }
- `POST /api/auth/login` { email, password } -> { token, role }
- `GET /api/auth/me` (Authorization: Bearer <token>) -> user profile

Notes:
- Roles expected: `student`, `placement` (or `department`), `admin`.
- Frontend code in the project uses these roles to redirect after login.
