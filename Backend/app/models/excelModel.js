import connection from "../../config/db.js";

class ExcelModel {
  static async getUsers() {
    const [rows] = await connection.promise().query("SELECT * FROM user");
    return rows;
  }
  static async insertUsers(users) {
    const query = `INSERT INTO user (name, email, username, usertype, age) VALUES ?`;
    const values = users.map((user) => [
      user.name,
      user.email,
      user.username,
      user.usertype,
      user.age,
    ]);
    try {
      await connection.promise().query(query, [values]);
      return { message: "User inserted successfully!" };
    } catch (error) {
      console.error("Error inserting users:", error);
      throw error;
    }
  }
}

export default ExcelModel;
