import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import ExcelModel from "../models/excelModel.js";

class ExcelController {
  // ✅ Export users from database to Excel file
  static async exportUsers(req, res) {
    try {
      const users = await ExcelModel.getUsers();

      if (users.length === 0) {
        return res
          .status(404)
          .json({ error: "No users found in the database" });
      }

      const worksheet = xlsx.utils.json_to_sheet(users);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Users");

      const exportDir = "exports";
      if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
      }

      const filePath = path.join(exportDir, "users.xlsx");
      xlsx.writeFile(workbook, filePath);

      res.download(filePath, "users.xlsx", (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).send("Error downloading file");
        }
      });
    } catch (error) {
      console.error("Error exporting users:", error);
      res.status(500).json({ error: "Failed to export users" });
    }
  }

  // ✅ Import data from Excel and insert into DB
  static async importUsers(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const users = xlsx.utils.sheet_to_json(sheet);

      if (users.length > 0) {
        await ExcelModel.insertUsers(users);
      }

      fs.unlinkSync(filePath);

      res.status(200).json({ message: "Data imported successfully!" });
    } catch (error) {
      console.error("Error importing users:", error);
      res.status(500).json({ error: "Failed to import users" });
    }
  }
}

export default ExcelController;
