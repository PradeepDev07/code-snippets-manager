import Snippet from "../models/Snippet.model.js";
import User from "../models/Users.model.js";

export const createSnippet = async (userId, data) => {
  const snippet = await Snippet.create({
    ...data,
    createdBy: userId,
  });
  return await snippet.populate("createdBy", "userName profileImage");
};

export const getUserSnippets = async (userId) => {
  const snippets = await Snippet.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .populate("createdBy", "userName profileImage");
  if (!snippets || snippets.length === 0) {
    throw new Error("No snippets found");
  }
  return snippets;
};

export const getPublicSnippetsDB = async () => {
  const snippets = await Snippet.find({ isPublic: true }).populate(
    "createdBy",
    "userName profileImage"
  );
  return snippets;
};

export const getLimitedPublicSnippets = async () => {
  const snippets = await Snippet.find({ isPublic: true })
    .limit(10)
    .sort({ createdAt: -1 })
    .populate("createdBy", "userName profileImage");
  return snippets;
};

export const getSnippetsByTag = async (tag) => {
  const snippets = await Snippet.find({ tags: tag, isPublic: true }).populate(
    "createdBy",
    "userName profileImage"
  );
  if (!snippets || snippets.length === 0) {
    throw new Error("No snippets found with the specified tag");
  }
  return snippets;
};

export const updateSnippet = async (id, data) => {
  const snippet = await Snippet.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("createdBy", "userName profileImage");
  if (!snippet) {
    throw new Error("Snippet not found");
  }
  return snippet;
};

export const deleteSnippet = async (id) => {
  const snippet = await Snippet.findByIdAndDelete(id);
  if (!snippet) {
    throw new Error("Snippet not found");
  }
  return { message: "Snippet deleted successfully" };
};

export const searchSnippets = async ({ language, tag, userName }) => {
  const query = { isPublic: true };

  if (language) {
    query.language = language;
  }

  if (tag) {
    query.tags = { $regex: new RegExp(`^${tag}`, "i") };
  }

  if (userName) {
    const users = await User.find({
      userName: { $regex: new RegExp(`^${userName}`, "i") },
    });
    if (users.length > 0) {
      query.createdBy = { $in: users.map((user) => user._id) };
    } else {
      return []; // User not found, so no snippets
    }
  }

  const snippets = await Snippet.find(query).populate(
    "createdBy",
    "userName profileImage"
  );
  return snippets;
};

// export const getUserByUsername = async (username) => {
//    const user = await User.findOne({ username });
//   if (!user) {
//     throw new Error("User not found");
//   }
//   return user;
// };
