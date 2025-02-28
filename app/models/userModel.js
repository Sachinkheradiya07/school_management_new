import connection from "../../config/db.js";

class UserModel {
  static async getAllUser(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const countQuery = `SELECT COUNT(*) as total FROM users`;
    const query = `SELECT name, email, username, usertype FROM users LIMIT ? OFFSET ?`;
    try {
      const [users] = await connection
        .promise()
        .query(query, [pageSize, offset]);
      const [totalCount] = await connection.promise().query(countQuery);

      return { users, total: totalCount[0].total };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async getUserById(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    try {
      const [result] = await connection.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async updateUser(id, updatedData) {
    const { name, email, username, usertype, age, profileimage } = updatedData;
    const query = `UPDATE users SET name = ?, email = ?, username = ?, usertype = ?, age = ?, profileimage = ? WHERE id = ?`;
    try {
      const [updatedUser] = await connection
        .promise()
        .query(query, [name, email, username, usertype, age, profileimage, id]);
      return updatedUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async deleteUser(id) {
    const query = `DELETE FROM users WHERE id = ?`;
    try {
      const deletedUser = await connection.promise().query(query, [id]);
      return deletedUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async getAgeGroupCounts() {
    const queryBelow10 = `SELECT COUNT(*) as count FROM users WHERE age < 10`;
    const queryBetween10And14 = `SELECT COUNT(*) as count FROM users WHERE age BETWEEN 10 AND 14`;
    const queryAbove14 = `SELECT COUNT(*) as count FROM users WHERE age > 14`;

    try {
      const [below10] = await connection.promise().query(queryBelow10);
      const [between10And14] = await connection
        .promise()
        .query(queryBetween10And14);
      const [above14] = await connection.promise().query(queryAbove14);

      return {
        below10: below10[0].count,
        between10And14: between10And14[0].count,
        above14: above14[0].count,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default UserModel;
