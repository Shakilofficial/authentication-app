# Authentication App

A full-stack user authentication and authorization application built using:

- **Frontend**: React, Next.js, TailwindCSS, Redux Toolkit, react-hook-form
- **Backend**: Node.js, Express.js, TypeScript, MongoDB (Mongoose), JWT, Zod

## ✨ Features

- User Registration & Login (JWT-based)
- Secure route protection (Private/Public routes)
- Zod-powered request validation
- Persistent login with refresh tokens
- Responsive and accessible UI

## 📂 Tech Stack

| Layer     | Tech Used                                                         |
| --------- | ----------------------------------------------------------------- |
| Frontend  | Next.js, React, TailwindCSS, Redux Toolkit, React Hook Form, Zod  |
| Backend   | Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Zod, bcrypt |
| Utilities | dotenv, cookie-parser, cors, eslint, prettier                      |

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

---

### 📦 1. Clone the Repository

```bash
git clone https://github.com/your-username/authify.git
cd authify
```

---

### 🛠️ 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

---

### 🎨 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🛡️ Environment Variables

Ensure both the **client** and **server** folders have their own `.env` files.

---

### 📁 `server/.env.example`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/authdb
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN=10d
JWT_REFRESH_EXPIRES_IN=30d
CLIENT_URL=http://localhost:3000
```

---
