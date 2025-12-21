import User from "../models/Users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async ({
  firstName,
  lastName,
  userName,
  email,
  password,
  profileImage,
  role
}) => {
  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    throw new Error("User with this email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    userName: userName ,
    email,
    password: hashedPassword,
    profileImage,
    role
  });
  if (!user) throw new Error("Registration failed");
  return { message: "User created" };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id , role: user.role }, process.env.JWT_SECRET);
  return { token, user };
};
