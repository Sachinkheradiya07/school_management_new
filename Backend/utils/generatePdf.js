import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate user profile PDF
export const generateUserPDF = async (userData) => {
  console.log("Generating PDF for user:", userData);

  const doc = new PDFDocument();
  const filename = path.join(__dirname, "../../output.pdf");
  const stream = fs.createWriteStream(filename);
  doc.pipe(stream);

  const imageWidth = 100;
  const pageWidth = doc.page.width;
  const xPosition = (pageWidth - imageWidth) / 2;
  const yPosition = 50;

  if (userData.profileimage) {
    const imagePath = path.join(__dirname, "../uploads", userData.profileimage);
    console.log("Image Path:", imagePath);
    if (fs.existsSync(imagePath)) {
      doc.image(imagePath, xPosition, yPosition, { width: imageWidth });
    } else {
      console.log("⚠️ Profile image not found, skipping...");
    }
  }

  const textStartY = yPosition + 120;
  doc.fontSize(14).text(`Name: ${userData.name || "N/A"}`, 50, textStartY);
  doc
    .fontSize(14)
    .text(`Username: ${userData.username || "N/A"}`, 50, textStartY + 20);
  doc
    .fontSize(14)
    .text(`Email: ${userData.email || "N/A"}`, 50, textStartY + 40);
  doc
    .fontSize(14)
    .text(`User Type: ${userData.usertype || "N/A"}`, 50, textStartY + 60);
  doc.fontSize(14).text(`Age: ${userData.age || "N/A"}`, 50, textStartY + 80);

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filename));
    stream.on("error", reject);
  });
};

// Function to generate an invoice PDF
export const generateInvoicePDF = async (customerName, items, totalAmount) => {
  return new Promise((resolve, reject) => {
    try {
      const pdfPath = path.join(__dirname, "../../invoice.pdf");
      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      const logoPath = path.join(__dirname, "../uploads/1740672871054.jpg");
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 450, 80, { width: 100 });
      } else {
        console.log("⚠️ Logo image not found, skipping...");
      }

      doc.moveDown(3);

      // Header
      doc.fontSize(20).text("SHIPZY", { align: "left" });
      doc.fontSize(10).text("567 Street Name", { align: "left" });
      doc.text("City, State ZIP Code, Country");
      doc.text("Phone: 888-888-8888");
      doc.text("Email: contact@email.com");
      doc.text("Website: companywebsite.com");
      doc.moveDown(1);

      // Bill To Section
      doc.fontSize(14).text(`Billed To:`, { underline: true });
      doc.text(`${customerName}`);
      doc.text("Client Street Address");
      doc.text("City, State ZIP Code, Country");
      doc.moveDown();

      // Invoice Title & Details
      doc.fontSize(18).text("Invoice", { align: "left" });
      doc.fontSize(12).text(`Invoice Number: 00001`);
      doc.text(`Date of Issue: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      // Table Header
      doc.fontSize(12).text("Description", 50, doc.y, { continued: true });
      doc.text("Unit Cost", 250, doc.y, { continued: true });
      doc.text("QTY/HR RATE", 350, doc.y, { continued: true });
      doc.text("Amount", 450, doc.y);
      doc.moveDown(0.5);
      doc
        .strokeColor("#000")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();
      doc.moveDown(0.5);

      // Table Content
      items.forEach((item) => {
        doc.text(item.name, 50, doc.y, { continued: true });
        doc.text(`$${item.price}`, 250, doc.y, { continued: true });
        doc.text("1", 350, doc.y, { continued: true });
        doc.text(`$${item.price}`, 450, doc.y);
      });

      doc.moveDown();
      doc
        .strokeColor("#000")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();
      doc.moveDown();

      // Total Amount
      doc.fontSize(14).text(`Subtotal: $${totalAmount}`);
      doc.text("Discount: $0");
      doc.text("Tax Rate: 0%");
      doc.text("Tax: $0");
      doc.moveDown();
      doc
        .fontSize(16)
        .text(`Invoice Total: $${totalAmount}`, { align: "right", bold: true });

      doc.end();

      writeStream.on("finish", () => {
        resolve(pdfPath);
      });

      writeStream.on("error", (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};
