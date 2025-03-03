import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import assignRoutes from "./assignRouts.js";
import marksRoutes from "./marksRoutes.js";
import cityRoutes from "./cityRoutes.js";
import exportRouts from "./excelRoutes.js";

const initialRouter = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/assign", assignRoutes);
  app.use("/api/marks", marksRoutes);
  app.use("/api", cityRoutes);
  app.use("/excel", exportRouts);
};

export default initialRouter;
