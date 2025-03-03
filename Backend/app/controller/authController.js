import AuthModel from "../models/authModel.js";
import { generateToken } from "../../utils/generateToken.js";

class AuthController {
  static async register(req, res) {
    const users = req.body;
    const profileimagePath = req.file ? req.file.filename : null;
    users.profileimage = profileimagePath;
    try {
      const insertedUser = await AuthModel.insertUser(users);
      return res.status(201).json({ insertedUser });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async login(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await AuthModel.LoginUser({ username, email, password });
      if (user) {
        const token = generateToken(user.id, user.usertype);
        return res.status(200).json({ user, token });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default AuthController;
