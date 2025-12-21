import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createSnippet,
  getMySnippets,
  getSnippetsByTag,
  updateSnippet,
  deleteSnippet,
  getPublicSnippets,
  searchSnippets,
  getLimitedPublicSnippets
} from "../controllers/snippet.controller.js";
import  oAuth  from "../middleware/oauth.middleware.js";

const router = express.Router();
// Public Snippets
router.get("/public", getLimitedPublicSnippets);
router.get("/", auth , getPublicSnippets);
router.get("/search", auth, searchSnippets);

// Protected Routes

//CRUD Operations
router.post("/", auth, oAuth, createSnippet);
router.put("/:id", auth, oAuth, updateSnippet);
router.delete("/:id", auth, oAuth, deleteSnippet);

router.get("/me", auth, oAuth, getMySnippets);
router.get("/tags/:tag", auth , getSnippetsByTag);




export default router;
