import express from "express";
import "./config/db.js";
import initializeRoutes from "./routes/index.js";
import { limiter } from "./utils/apiRateLimit.js";
import cors from "cors";
const app = express();
const port = 8080;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
initializeRoutes(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
