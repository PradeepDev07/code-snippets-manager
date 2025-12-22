import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import snippetRoutes from "./routes/snippet.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors(
    {origin: 'https://code-snippets-manager-weld.vercel.app', // add your client URL here or use '*' for all origins
    credentials: true}
));
app.use(express.json());// to parse JSON request bodies
app.use(morgan("dev"));// HTTP request logger : logs details of incoming requests to the console

app.use("/api/v1/auth", authRoutes);// Auth routes 
app.use("/api/v1/snippets", snippetRoutes);// Snippet routes

app.use(errorHandler);// Global error handling middleware

export default app;
