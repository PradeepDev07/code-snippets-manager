import mongoose from "mongoose";

const language = [
  "javascript",
  "python",
  "sql",
  "html",
  "css",
  "java",
  "cpp",
  "react",
  
];

const snippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true },
    language: { type: String, required: true, enum: language },
    tags: [{ type: String }],
    isPublic: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  },
  { timestamps: true }
);

export default mongoose.model("Snippet", snippetSchema);
