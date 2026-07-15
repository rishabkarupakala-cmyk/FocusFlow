import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";

import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    searchTasks,
    filterByCategory,
    filterByPriority,
    getCompletedTasks,
    getPendingTasks
} from "../services/taskService.js";

export async function fetchTasks(
    req: AuthRequest,
    res: Response
) {

    try {

        const tasks = await getAllTasks(req.user!.id);

        res.status(200).json(tasks);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });

    }

}

export async function addTask(
    req: AuthRequest,
    res: Response
) {

    try {

        const result = await createTask(
            req.body,
            req.user!.id
        );

        res.status(201).json({

            message: "Task created successfully",

            result

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to create task"

        });

    }

}

export async function editTask(
    req: AuthRequest,
    res: Response
) {

    try {

        const id = Number(req.params.id);

        const result = await updateTask(
            id,
            req.body,
            req.user!.id
        );

        res.status(200).json({

            message: "Task updated successfully",

            result

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to update task"

        });

    }

}

export async function removeTask(
    req: AuthRequest,
    res: Response
) {

    try {

        const id = Number(req.params.id);

        const result = await deleteTask(
            id,
            req.user!.id
        );

        res.status(200).json({

            message: "Task deleted successfully",

            result

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to delete task"

        });

    }

}

export async function completeTask(
    req: AuthRequest,
    res: Response
) {

    try {

        const id = Number(req.params.id);

        const result = await toggleTaskCompletion(
            id,
            req.user!.id
        );

        res.status(200).json({

            message: "Task completion updated",

            result

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to update task"

        });

    }

}

export async function searchTask(
    req: AuthRequest,
    res: Response
) {

    try {

        const title = String(req.query.title || "");

        const tasks = await searchTasks(title);

        res.status(200).json(tasks);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Search failed"

        });

    }

}

export async function getTasksByCategory(
    req: AuthRequest,
    res: Response
) {

    try {

        const category = String(req.query.category);

        const tasks = await filterByCategory(category);

        res.status(200).json(tasks);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to filter tasks"

        });

    }

}

export async function getTasksByPriority(
    req: AuthRequest,
    res: Response
) {

    try {

        const priority = String(req.query.priority);

        const tasks = await filterByPriority(priority);

        res.json(tasks);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Priority filter failed"

        });

    }

}

export async function completedTasks(
    req: AuthRequest,
    res: Response
) {

    try {

        const tasks = await getCompletedTasks();

        res.json(tasks);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed"

        });

    }

}

export async function pendingTasks(
    req: AuthRequest,
    res: Response
) {

    try {

        const tasks = await getPendingTasks();

        res.json(tasks);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed"

        });

    }

}