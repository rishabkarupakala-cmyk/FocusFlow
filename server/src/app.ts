import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to FocusFlow API 🚀"
    });
});

app.use("/api/tasks", taskRoutes);

export default app;