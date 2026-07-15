import { Router } from "express";
import {fetchTasks, addTask, editTask, removeTask, completeTask, searchTask, getTasksByCategory, getTasksByPriority, completedTasks,pendingTasks} from "../controllers/taskController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/", authenticateToken, fetchTasks);

router.post("/", authenticateToken, addTask);

router.put("/:id", authenticateToken, editTask);

router.delete("/:id", authenticateToken, removeTask);

router.patch("/:id/complete", authenticateToken, completeTask);

router.get("/search", authenticateToken, searchTask);

router.get("/category", authenticateToken, getTasksByCategory);

router.get("/priority", authenticateToken, getTasksByPriority);

router.get("/completed", authenticateToken, completedTasks);

router.get("/pending", authenticateToken, pendingTasks);
export default router;