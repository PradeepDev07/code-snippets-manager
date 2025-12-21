import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(req.user);
    
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
