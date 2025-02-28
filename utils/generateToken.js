import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id, usertype) => {
  return jwt.sign({ id, usertype }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
