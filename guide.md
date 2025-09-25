# DevConnect Deployment & Troubleshooting Guide

This document provides a detailed overview of the deployment process for the DevConnect application, the challenges faced during deployment, and the solutions implemented.

## 1. Deployment Architecture

The application is a full-stack project with a separate frontend and backend. They are deployed independently on platforms optimized for their respective technologies.

- **Frontend (React)**
  - **Platform**: [Vercel](https://vercel.com/)
  - **Reason**: Vercel is a platform built by the creators of Next.js and is highly optimized for hosting modern frontend frameworks like React. It offers seamless Git integration, automatic deployments, and a generous free tier.

- **Backend (Node.js & Express)**
  - **Platform**: [Render](https://render.com/)
  - **Reason**: Render provides a flexible free tier for web services that can run Node.js applications. It also offers managed databases and makes it easy to manage environment variables.

- **Database (MongoDB)**
  - **Platform**: [MongoDB Atlas](https://www.mongodb.com/atlas/database)
  - **Reason**: MongoDB Atlas is a fully managed cloud database service. Its free tier (M0 cluster) is perfect for development and small-scale production applications.

---

## 2. The Cross-Origin Authentication Problem

After the initial deployment, a critical issue was discovered.

- **Symptom**: User login and signup worked correctly on desktop browsers but failed consistently on mobile browsers. The error messages were "Invalid Credentials" on login and a generic failure message on signup.
- **Root Cause**: The issue stemmed from how modern browsers, especially on mobile, handle third-party cookies for security and privacy. Your frontend was on `*.vercel.app` and your backend was on `*.onrender.com`. Because both `.vercel.app` and `.onrender.com` are on the **Public Suffix List (PSL)**, browsers treated them as two completely separate public domains. This caused them to block the backend's authentication cookie from being saved or sent, as it was considered a "third-party cookie on a public suffix," a known tracking vector that is now widely blocked.

---

## 3. The Solution: Vercel Proxy Rewrites

To solve the cross-origin cookie issue, we needed to make the browser believe that the frontend and backend were running on the **same domain**. We achieved this by using Vercel's proxying capabilities.

Instead of the browser sending a request from `vercel.app` to `onrender.com`, the browser now sends a request to a local path on the Vercel domain, and Vercel forwards it to the backend server.

### Step-by-Step Implementation:

**1. Created a Vercel Configuration File:**
A `vercel.json` file was created in the `Frontend` directory with the following content. This rule tells Vercel: "If you receive a request to `/api/...`, forward it to the Render backend."

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://devconnectbackend-algg.onrender.com/:path*"
    }
  ]
}
```

**2. Updated the Frontend API URL:**
The frontend code was modified to make API calls to the local `/api` path instead of the absolute Render URL. This was done in `Frontend/src/utils/constants.js`.

```javascript
// Before
// export const BASE_URL = "http://localhost:3000";

// After
export const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:3000';
```

**3. Configured Vercel Environment Variable:**
In the Vercel project settings, the `VITE_BACKEND_BASE_URL` environment variable was set to `/api`. Now, all API calls from the deployed frontend are directed to the proxy.

### Other Important Fixes Implemented:

During troubleshooting, several other critical backend configurations were put in place:

- **Enabled Trust Proxy (`app.js`):**
  ```javascript
  app.set('trust proxy', 1);
  ```
  This tells Express to trust the information coming from Render's reverse proxy, which is essential for `secure` cookies to work correctly.

- **Configured Cookie Settings (`authRouter.js`):**
  The authentication cookie was configured with the necessary flags for cross-domain communication, although the proxy solution ultimately made this less critical.
  ```javascript
  res.cookie("Token", Token, {
      // ...
      secure: true,       // Only send over HTTPS
      sameSite: 'none'    // Allow cross-domain
  });
  ```

- **Flexible CORS Policy (`app.js`):**
  The CORS (Cross-Origin Resource Sharing) policy was updated to read from an environment variable, `ALLOWED_ORIGINS`, allowing both local and deployed frontend URLs to make requests during development and production.
  ```javascript
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  ```

---

## Appendix: Full Step-by-Step Deployment Guide

Here is a comprehensive guide to deploying the entire application from scratch.

### Prerequisites

*   A GitHub account with the project code pushed to a repository.
*   A free account on [MongoDB Atlas](https://www.mongodb.com/atlas/database), [Render](https://render.com/), and [Vercel](https://vercel.com/).
*   Node.js and npm installed on your local machine.

### Step A: Set Up the Database on MongoDB Atlas

1.  **Create a Cluster**: In your MongoDB Atlas dashboard, create a new project and build a database. Choose the **Free M0 tier**, select a cloud provider and region, and give your cluster a name.
2.  **Create a Database User**: Under "Database Access," create a new database user with a secure username and password. You will need these for your connection string.
3.  **Configure Network Access**: Under "Network Access," add the IP address `0.0.0.0/0` to the access list. This allows your backend on Render to connect to the database from any IP address.
4.  **Get Connection String**: Go to your cluster's "Overview" and click "Connect." Select "Drivers," and copy the connection string provided. Replace `<password>` with the password you created in step 2. This full string is your `DB_URI`.

### Step B: Deploy the Backend to Render

1.  **Create a New Web Service**: In the Render dashboard, click **New + > Web Service** and connect your GitHub repository.
2.  **Configure the Service**:
    *   **Name**: Give your service a name (e.g., `devconnect-backend`).
    *   **Root Directory**: `Backend or ./`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Instance Type**: Select the **Free** tier.
3.  **Add Environment Variables**: Before the first deployment, go to the "Environment" tab and add the following secrets:
    *   `DB_URI`: The full connection string from MongoDB Atlas.
    *   `JWT_SECRET_KEY`: A long, random, and secret string for signing tokens.
    *   `ALLOWED_ORIGINS`: Start with just `http://localhost:5173`. You will add your Vercel URL later.
    *   `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`: Your credentials for your email-sending service.
4.  **Deploy**: Click **Create Web Service**. After the first build, Render will provide you with the public URL for your backend (e.g., `https://devconnect-backend.onrender.com`).

### Step C: Deploy the Frontend to Vercel

1.  **Create a New Project**: In the Vercel dashboard, click **Add New... > Project** and import your GitHub repository.
2.  **Configure the Project**:
    *   **Framework Preset**: Vercel will likely auto-detect **Vite**.
    *   **Root Directory**: Set this to `Frontend or ./`.
3.  **Add Environment Variables**: In the project settings, go to "Environment Variables" and add the following:
    *   `VITE_BACKEND_BASE_URL`: Set this to `/api`.
4.  **Deploy**: Click **Deploy**. Vercel will build your site and provide a public URL (e.g., `https://your-frontend.vercel.app`).

### Step D: Final Configuration

1.  **Update `vercel.json`**: Ensure the `destination` URL in `Frontend/vercel.json` matches your live Render backend URL.
2.  **Update Render `ALLOWED_ORIGINS`**: Go back to your backend service on Render. Update the `ALLOWED_ORIGINS` environment variable to include your final Vercel URL, separated by a comma:
    *   **Key**: `ALLOWED_ORIGINS`
    *   **Value**: `http://localhost:5173,https://your-frontend.vercel.app`
3.  **Redeploy**: Commit any changes to GitHub. Vercel and Render will automatically start new deployments. Once complete, your application should be fully functional.
