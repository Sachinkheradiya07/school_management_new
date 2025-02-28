import express from "express";
import "./config/db.js";
import initializeRoutes from "./routes/index.js";
import { limiter } from "./utils/apiRateLimit.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
initializeRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
