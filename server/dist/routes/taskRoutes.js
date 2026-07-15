import { Router } from "express";
const router = Router();
console.log("✅ taskRoutes loaded");
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task route works!"
    });
});
export default router;
