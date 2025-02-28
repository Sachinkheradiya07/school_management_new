import Marks from "../models/markModel.js";

class MarksController {
  static async addMarks(req, res) {
    try {
      const { studentId, facultyId, subjectId, marks } = req.body;
      if (!studentId || !facultyId || !subjectId || !marks) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      await Marks.addMarks(studentId, facultyId, subjectId, marks);
      res.status(200).json({ message: "Marks added successfully." });
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }

  static async getMarks(req, res) {
    try {
      const marks = await Marks.getMarks();
      res.status(200).json(marks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch marks data" });
    }
  }
}

export default MarksController;
