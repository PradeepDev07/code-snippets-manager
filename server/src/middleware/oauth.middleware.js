
import Snippet from "../models/Snippet.model.js";

const oAuth = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }


    if (user.role === "admin") {
      return next();
    }

    if (user.role !== "user") {
      return res.status(403).json({ message: "Forbidden: Unknown role" });
    }

    const { id } = req.params;


    if (!id) {
      
      if (req.method === "POST" || req.method === "GET") {
        return next();
      }
      return res.status(403).json({ message: "Forbidden" });
    }

    // --- Resource Level Operations (With ID) ---
    // Optimize: Select only necessary fields
    const snippet = await Snippet.findById(id).select("createdBy isPublic");

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    const isOwner = snippet.createdBy.toString() === user.id;

    // View: Allow if public or owner
    if (req.method === "GET") {
      if (snippet.isPublic || isOwner) {
        return next();
      }
      return res.status(403).json({ message: "Forbidden: Private snippet" });
    }

    // Edit/Delete: Allow only if owner
    if (["PUT", "PATCH", "DELETE"].includes(req.method)) {
      if (isOwner) {
        return next();
      }
      return res.status(403).json({ message: "Forbidden: You can only modify your own snippets" });
    }

    return res.status(403).json({ message: "Forbidden" });

  } catch (error) {
    next(error);
  }
};

export default oAuth;