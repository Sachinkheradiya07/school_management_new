import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "invalid user" });
  }

  const tokenString = token.split(" ")[1];

  try {
    const decoded = jwt.verify(tokenString, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export const checkUser = (usertype) => {
  return (req, res, next) => {
    const allowRole = Array.isArray(usertype) ? usertype : [usertype];
    if (!allowRole.includes(req.user.usertype)) {
      return res
        .status(403)
        .json({ error: "Access Denied. Insufficient permissions." });
    }
    next();
  };
};
