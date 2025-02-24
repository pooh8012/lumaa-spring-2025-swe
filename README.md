# Task Manager Application

A **minimal** and **stylish** full-stack Task Manager application. Register, log in, and manage your tasks (create, update, mark as complete/incomplete, and delete) with ease.

---

## Overview

- **Backend:**  
  Built with Node.js, Express, and TypeScript. Uses PostgreSQL as the database.
- **Frontend:**  
  Built with React and TypeScript.

> **Note:** The PostgreSQL database is set up locally, so you need to create the database on your machine.

---

## Table of Contents

- [Local Database Setup](#local-database-setup)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Video Demo](#video-demo)
- [Additional Notes](#additional-notes)
- [Salary Expectation](#salary-expectation)

---

## Local Database Setup

1. **Install PostgreSQL:**

   - **macOS (Homebrew):**
     ```bash
     brew install postgresql
     brew services start postgresql
     ```
   - **Windows:**
     Download and install from the [official website](https://www.postgresql.org/download/windows/).
   - **Linux:**
     ```bash
     sudo apt install postgresql postgresql-contrib
     ```

2. **Create the Database:**

   ```bash
   createdb taskmanager
   ```

   _Alternatively, using psql:_

   ```bash
   psql -U postgres
   CREATE DATABASE taskmanager;
   \q
   ```

3. **Run Migrations:**

   In the `backend/src/migrations` directory, the file `001_create_tables.sql` sets up the required tables (`users` and `tasks`). Run:

   ```bash
   psql -h localhost -p 5432 -U postgres -d taskmanager -f migrations/001_create_tables.sql
   ```

   If prompted, set the password using:

   ```bash
   export PGPASSWORD='your_postgres_password'
   ```

---

## Installation & Setup

Clone the repository (it contains two main folders: **backend** and **frontend**):

```bash
git clone https://github.com/pooh8012/lumaa-spring-2025-swe.git
```

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the `backend` folder with the following:

   ```env
   PORT=4000
   DATABASE_URL=postgres://postgres:pooja@localhost:5432/taskDB
   JWT_SECRET=2205
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the `frontend` folder with:

   ```env
   REACT_APP_API_URL=http://localhost:4000
   ```

---

## Running the Application

### Backend

- **Development Mode:**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm run build
  npm start
  ```
  The server runs on the port specified in the `.env` file (default: 5000).

### Frontend

Start the React application with:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Testing

- **Manual Testing:**
  - **Register & Login:** Use the UI to create an account and log in.
  - **Task Management:** Once logged in, create, update (mark complete/incomplete), and delete tasks.
- **API Testing:**
  - Use tools like [Postman](https://www.postman.com/) or `curl` to test endpoints:
    - `POST /auth/register` & `POST /auth/login`
    - `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
- **Logging:**  
  Check the console logs in both backend and frontend for any error messages or debugging info.

---

## Video Demo

Watch the [Video Demo](https://drive.google.com/file/d/1r0dHChE21PptUszVZomHjHsvo6LhPG4z/view) to see the application in action:

- User registration & login
- Task creation, update, and deletion

---

## Salary Expectation

I can work upto 40 hours a week at $25 per hour, so that would be total of $4,000 monthly. I am open for negotiation.

---

## Additional Notes

- **Minimal & Readable:**  
  The code is intentionally minimal to ensure clarity and ease of maintenance.
- **Local Database:**  
  Ensure PostgreSQL is installed and the `taskmanager` database is created locally.
- **Environment Variables:**  
  Set up the `.env` files in both **backend** and **frontend** with the appropriate values.
- **Security:**  
  Do not commit your `.env` files to public repositories. Use a `.gitignore` to keep them private.

---

Thank you for checking out the Task Manager Application! If you have any questions or suggestions, please open an issue or contact me.
