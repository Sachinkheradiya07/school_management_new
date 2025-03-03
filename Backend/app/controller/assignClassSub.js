import Assignment from "../models/assignClassSub.js";

class AssignController {
  static async assignStudent(req, res) {
    const { studentId, classId, subjectId } = req.body;
    try {
      const assignment = await Assignment.assignStudent(
        studentId,
        classId,
        subjectId
      );
      res.status(201).send(assignment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async assignFaculty(req, res) {
    const { facultyId, classId, subjectId } = req.body;
    try {
      const assignment = await Assignment.assignFaculty(
        facultyId,
        classId,
        subjectId
      );
      res.status(201).send(assignment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getStudentAssignments(req, res) {
    const { studentId } = req.params;
    try {
      const assignments = await Assignment.getStudentAssignments(studentId);

      res.status(200).send({ data: assignments });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getFacultyAssignments(req, res) {
    const { facultyId } = req.params;
    try {
      const assignments = await Assignment.getFacultyAssignments(facultyId);

      res.status(200).send(assignments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default AssignController;
