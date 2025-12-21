# Code Snippet Manager Server
# this was genarated by me through AI for backend referance when creating the front-end
This is the backend server for the Code Snippet Manager application. It provides a RESTful API for managing code snippets, user authentication, and searching.

## Table of Contents

- [Code Snippet Manager Server](#code-snippet-manager-server)
- [this was genarated by me through AI for backend referance when creating the front-end](#this-was-genarated-by-me-through-ai-for-backend-referance-when-creating-the-front-end)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
      - [1. Register User](#1-register-user)
      - [2. Login User](#2-login-user)
    - [Snippets](#snippets)
      - [1. Get Limited Public Snippets](#1-get-limited-public-snippets)
      - [2. Get All Public Snippets](#2-get-all-public-snippets)
      - [3. Search Snippets](#3-search-snippets)
      - [4. Create Snippet](#4-create-snippet)
      - [5. Update Snippet](#5-update-snippet)
      - [6. Delete Snippet](#6-delete-snippet)
      - [7. Get My Snippets](#7-get-my-snippets)
      - [8. Get Snippets by Tag](#8-get-snippets-by-tag)
  - [Validation](#validation)
  - [Resources](#resources)

## Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB (Local or Atlas)

## Installation

1.  Navigate to the server directory:
    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root of the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Server

-   **Development Mode** (with hot reloading via nodemon):
    ```bash
    npm run dev
    ```

-   **Production Mode**:
    ```bash
    npm start
    ```

The server will start on the port specified in your `.env` file (default is usually 5000).

## API Documentation

Base URL: `http://localhost:5000/api/v1`

### Authentication

Base Path: `/auth`

#### 1. Register User
-   **Endpoint:** `POST /register`
-   **Description:** Register a new user account.
-   **Body:**
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "userName": "johndoe",
      "email": "john@example.com",
      "password": "securepassword",
      "profileImage": "optional_url",
      "role": "user" // optional, default: "user"
    }
    ```
-   **Validation:** Checks if email or username already exists.

#### 2. Login User
-   **Endpoint:** `POST /login`
-   **Description:** Authenticate a user and return a JWT token.
-   **Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "securepassword"
    }
    ```
-   **Response:** Returns a JWT token and user details.

### Snippets

Base Path: `/snippets`

**Note:** Most snippet routes require an `Authorization` header with a Bearer token: `Authorization: Bearer <token>`

#### 1. Get Limited Public Snippets
-   **Endpoint:** `GET /public`
-   **Description:** Retrieve the latest 10 public snippets.
-   **Auth Required:** No

#### 2. Get All Public Snippets
-   **Endpoint:** `GET /`
-   **Description:** Retrieve all public snippets.
-   **Auth Required:** Yes

#### 3. Search Snippets
-   **Endpoint:** `GET /search`
-   **Description:** Search for snippets by language, tag, or username.
-   **Query Parameters:**
    -   `language`: Filter by programming language (e.g., `?language=javascript`)
    -   `tag`: Filter by tag (e.g., `?tag=react`)
    -   `userName`: Filter by creator's username (e.g., `?userName=johndoe`)
-   **Auth Required:** Yes

#### 4. Create Snippet
-   **Endpoint:** `POST /`
-   **Description:** Create a new code snippet.
-   **Auth Required:** Yes
-   **Body:**
    ```json
    {
      "title": "My Snippet",
      "description": "A useful code snippet",
      "code": "console.log('Hello World');",
      "language": "javascript",
      "tags": ["basics", "log"],
      "isPublic": true
    }
    ```
-   **Validation:** `language` must be one of the supported enums (javascript, python, sql, html, css, java, cpp, react).

#### 5. Update Snippet
-   **Endpoint:** `PUT /:id`
-   **Description:** Update an existing snippet by ID.
-   **Auth Required:** Yes
-   **Body:** (Partial updates allowed)
    ```json
    {
      "code": "console.log('Updated Code');"
    }
    ```

#### 6. Delete Snippet
-   **Endpoint:** `DELETE /:id`
-   **Description:** Delete a snippet by ID.
-   **Auth Required:** Yes

#### 7. Get My Snippets
-   **Endpoint:** `GET /me`
-   **Description:** Retrieve all snippets created by the authenticated user.
-   **Auth Required:** Yes

#### 8. Get Snippets by Tag
-   **Endpoint:** `GET /tags/:tag`
-   **Description:** Retrieve public snippets associated with a specific tag.
-   **Auth Required:** Yes

## Validation

-   **Data Models:** Mongoose schemas enforce data types and required fields.
    -   **User:** Requires unique `email` and `userName`.
    -   **Snippet:** Requires `title`, `code`, and `language`. `language` is validated against a predefined list.
-   **Business Logic:** Services handle checks for existing users and resource availability.
-   **Authentication:** JWT is verified via middleware for protected routes.

## Resources

-   [Express.js](https://expressjs.com/) - Web framework for Node.js
-   [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
-   [JSON Web Token (JWT)](https://jwt.io/) - Authentication standard
-   [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
-   [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger
