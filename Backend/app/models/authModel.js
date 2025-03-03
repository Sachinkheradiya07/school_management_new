import connection from "../../config/db.js";
import bcrypt from "bcrypt";

async function insertUser(userData) {
  const { name, email, password, username, usertype, age, profileimage } =
    userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (name, email, password, username, usertype, age,profileimage) VALUES (?, ?, ?, ?, ?, ?,?)`;
  try {
    const insertedUser = await connection
      .promise()
      .query(query, [
        name,
        email,
        hashedPassword,
        username,
        usertype,
        age,
        profileimage,
      ]);
    return { insertedUser };
  } catch (error) {
    return error;
  }
}

class AuthModel {
  static async insertUser(userData) {
    const { username, email } = userData;
    const query = `SELECT * FROM users WHERE username = ? OR email = ?`;
    try {
      const [existUser] = await connection
        .promise()
        .query(query, [username, email]);
      if (existUser.length > 0) {
        return "Username or email already exists";
      }
      return await insertUser(userData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async LoginUser({ username, email, password }) {
    let query, identifier;
    if (username) {
      query = `SELECT * FROM users WHERE username = ?`;
      identifier = username;
    } else if (email) {
      query = `SELECT * FROM users WHERE email = ?`;
      identifier = email;
    } else {
      throw new Error("Username or email is required");
    }
    try {
      const [user] = await connection.promise().query(query, [identifier]);
      if (user.length === 0) {
        throw new Error("User not found");
      }

      const validPassword = await bcrypt.compare(password, user[0].password);
      if (!validPassword) {
        throw new Error("Invalid password");
      }
      return user[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default AuthModel;
