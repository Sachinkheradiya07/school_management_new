import connection from "../../config/db.js";

class Assignment {
  static async assignStudent(studentId, classId, subjectId) {
    const query = `INSERT INTO student_assignments (student_id, class_id, subject_id) VALUES (?, ?, ?)`;
    try {
      const result = await connection
        .promise()
        .query(query, [studentId, classId, subjectId]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async assignFaculty(facultyId, classId, subjectId) {
    const query = `INSERT INTO faculty_assignments (faculty_id, class_id, subject_id) VALUES (?, ?, ?)`;
    try {
      const result = await connection
        .promise()
        .query(query, [facultyId, classId, subjectId]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getStudentAssignments(studentId) {
    const query = `
            SELECT sa.id, sa.class_id, sa.subject_id, c.class_name as class_name, s.subject_name as subject_name, u.name as student_name
            FROM student_assignments sa
            JOIN classes c ON sa.class_id = c.id
            JOIN subjects s ON sa.subject_id = s.id
            JOIN users u ON sa.student_id = u.id
            WHERE sa.student_id = ?
        `;
    try {
      console.log(`Executing query: ${query} with studentId: ${studentId}`);
      const [assignments] = await connection
        .promise()
        .query(query, [studentId]);
      console.log(`Assignments fetched: ${JSON.stringify(assignments)}`);
      return assignments;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFacultyAssignments(facultyId) {
    const query = `
            SELECT fa.id, fa.class_id, fa.subject_id, c.class_name as class_name, s.subject_name as subject_name, u.name as faculty_name
            FROM faculty_assignments fa
            JOIN classes c ON fa.class_id = c.id
            JOIN subjects s ON fa.subject_id = s.id
            JOIN users u ON fa.faculty_id = u.id
            WHERE fa.faculty_id = ?
        `;
    try {
      console.log(`Executing query: ${query} with facultyId: ${facultyId}`);
      const [assignments] = await connection
        .promise()
        .query(query, [facultyId]);
      console.log(`Assignments fetched: ${JSON.stringify(assignments)}`);
      return assignments;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Assignment;
