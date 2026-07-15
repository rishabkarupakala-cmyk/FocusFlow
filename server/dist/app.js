import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Root works");
});
app.get("/api/tasks", (req, res) => {
    res.json({
        success: true,
        message: "API is working!"
    });
});
export default app;
