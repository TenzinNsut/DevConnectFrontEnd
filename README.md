# DevConnect Frontend

## Description
This is the frontend application for DevConnect, a platform designed to connect developers. It provides a user-friendly interface for user authentication, profile management, connection request handling, and browsing a feed of potential connections.

## Features
*   User Authentication (Login, Signup, Forgot/Reset Password)
*   User Profile Management (View, Edit)
*   Dynamic User Feed with Tinder-like swipe animations
*   View Connections and Received Requests
*   Responsive UI
*   State management with Redux Toolkit

## Technologies Used
*   React.js
*   Vite (build tool)
*   Tailwind CSS
*   DaisyUI (Tailwind CSS component library)
*   React Router DOM
*   Redux Toolkit (for state management)
*   Axios (for API calls)
*   React Confetti (for success animations)

## Setup Instructions

### 1. Navigate to the Frontend directory
```bash
cd DevTinder/Frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the `Frontend` directory with the following variables:
```
VITE_BACKEND_BASE_URL=http://localhost:3000
```
*   Ensure `VITE_BACKEND_BASE_URL` matches the URL where your backend server is running.

### 4. Running the App
```bash
npm run dev
```
This will start the development server, usually at `http://localhost:5173`.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Runs ESLint for code quality checks.
*   `npm run preview`: Serves the production build locally.

## Potential Bugs/Improvements

*   **Code Consistency:**
    *   In `EditProfile.jsx` and `Signup.jsx`, consider initializing string fields in `formData` with empty strings (`''`) instead of spaces (`' '`) for better consistency.