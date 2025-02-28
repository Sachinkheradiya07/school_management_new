import connection from "../../config/db.js";

class Marks {
  static async addMarks(studentId, facultyId, subjectId, marks) {
    const query = `INSERT INTO marks (student_id, faculty_id, subject_id, marks) VALUES (?, ?, ?, ?)`;
    try {
      const result = await connection
        .promise()
        .query(query, [studentId, facultyId, subjectId, marks]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getMarks() {
    const query = `
      SELECT m.id, u.name as student_name, f.name as faculty_name, s.subject_name as subject_name, m.marks
      FROM marks m
      JOIN student_assignments sa ON m.student_id = sa.student_id
      JOIN faculty_assignments fa ON m.faculty_id = fa.faculty_id
      JOIN users u ON sa.student_id = u.id
      JOIN users f ON fa.faculty_id = f.id
      JOIN subjects s ON m.subject_id = s.id
    `;
    try {
      const [marks] = await connection.promise().query(query);
      return marks;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Marks;
