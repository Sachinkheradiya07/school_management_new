import UserModel from "../models/userModel.js";
import {
  generateInvoicePDF,
  generateUserPDF,
} from "../../utils/generatePdf.js";
import transporter from "../../utils/nodeMailer.js";
import cache from "../../utils/apiCache.js";

class UserController {
  static async getAllUser(req, res) {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const { users, total } = await UserModel.getAllUser(
        parseInt(page),
        parseInt(pageSize)
      );
      res.status(200).json({ users, total });
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
  static async updateUser(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedUser = await UserModel.updateUser(id, updatedData);
      res.status(200).json(updatedUser);
      cache.clear(`/api/user/${id}`);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await UserModel.deleteUser(id);
      res.status(200).json(deletedUser);
      cache.clear(`/api/user/${id}`);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
  static async getAgeGroupCounts(req, res) {
    try {
      const ageGroupCounts = await UserModel.getAgeGroupCounts();
      res.status(200).json(ageGroupCounts);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
  static async generateUserPDF(req, res) {
    try {
      const { id } = req.params;
      const userArray = await UserModel.getUserById(id);
      if (!userArray || userArray.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      const user = userArray[0];
      console.log("User Data for PDF:", user);
      // Generate PDF file
      const pdfPath = await generateUserPDF(user);
      // Send the file for download
      res.download(pdfPath, `UserProfile_${user.username}.pdf`, (err) => {
        if (err) {
          console.error("Error sending PDF:", err);
          res.status(500).json({ error: "Error generating PDF" });
        }
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async generateInvoice(req, res) {
    const { email, customerName, items, totalAmount } = req.body;

    try {
      // Generate PDF
      const pdfPath = await generateInvoicePDF(
        customerName,
        items,
        totalAmount
      );
      let mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: "Your Invoice",
        text: `Hello ${customerName},\n\nPlease find your invoice attached.`,
        attachments: [{ filename: "invoice.pdf", path: pdfPath }],
      };
      // Send Email
      await transporter.sendMail(mailOptions);
      res.json({ message: "Invoice generated and sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error generating invoice", error });
    }
  }
}

export default UserController;
