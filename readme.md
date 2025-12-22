# Code Snippet Manager

A full-stack web application for developers to store, organize, and share code snippets. Built with the MERN stack (MongoDB, Express, React, Node.js).
## AI used areas 
-  test-*.js
-  readme.md
-  testing js files 

## Features

-   **User Authentication:** Secure Login and Signup using JWT.
-   **Snippet Management:** Create, Read, Update, and Delete (CRUD) your code snippets.
-   **Syntax Highlighting:** Beautiful code display supporting multiple languages.
-   **Search & Explore:** Find snippets by language, tags, or username.
-   **Public & Private:** Choose to share your snippets with the world or keep them private.
-   **Forking:** Fork snippets from other users to make your own modifications.
-   **Tag System:** Organize snippets with tags and browse by clicking on them.
-   **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Tech Stack

-   **Frontend:** React (Vite), Tailwind CSS, React Router, React Hot Toast.
-   **Backend:** Node.js, Express.js.
-   **Database:** MongoDB (with Mongoose).
-   **Authentication:** JSON Web Tokens (JWT) & Cookies.

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14+ recommended)
-   [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
-   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd code_snippet_manager
    ```

2.  **Setup the Backend (Server):**

    Navigate to the server directory and install dependencies:

    ```bash
    cd server
    npm install
    ```

    Create a `.env` file in the `server` directory with the following variables:

    ```env
    PORT=3001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

    Start the server:

    ```bash
    npm run dev
    ```
    The server should be running on `http://localhost:3001`.

3.  **Setup the Frontend (Client):**

    Open a new terminal, navigate to the client directory, and install dependencies:

    ```bash
    cd client
    npm install
    ```

    Start the client development server:

    ```bash
    npm run dev
    ```
    The application should now be accessible at `http://localhost:5173` (or the port shown in your terminal).

## Usage

1.  Open your browser and go to the client URL.
2.  Sign up for a new account.
3.  Go to your Dashboard to create your first snippet!

## Deployed
vercel : https://code-snippets-manager-weld.vercel.app/
