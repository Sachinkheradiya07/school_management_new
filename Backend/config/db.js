import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "your_password",
  database: "school_management",
});

connection.connect((err) => {
  if (err) {
    console.log("Error in the connection");
  } else {
    console.log(`DB Connected`);
  }
});

export default connection;
