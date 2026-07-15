import pool from "../config/database.js";
import { Task } from "../types/tasks.js";

export async function getAllTasks(userId: number) {

    const sql = `
        SELECT *
        FROM tasks
        WHERE user_id = ?
        ORDER BY create_at DESC
    `;

    const [rows] = await pool.execute(sql, [userId]);

    return rows;

}

export async function createTask(
    task: Task,
    userId: number
) {

    const sql = `
        INSERT INTO tasks
        (
            title,
            description,
            category,
            priority,
            due_date,
            user_id
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [

        task.title,
        task.description,
        task.category,
        task.priority,
        task.due_date,
        userId

    ]);

    return result;

}

export async function updateTask(
    id: number,
    task: Task,
    userId: number
) {

    const sql = `
        UPDATE tasks
        SET
            title = ?,
            description = ?,
            category = ?,
            priority = ?,
            due_date = ?
        WHERE id = ?
        AND user_id = ?
    `;

    const [result] = await pool.execute(sql, [

        task.title,
        task.description,
        task.category,
        task.priority,
        task.due_date,
        id,
        userId

    ]);

    return result;

}

export async function deleteTask(
    id: number,
    userId: number
) {

    const sql = `
        DELETE FROM tasks
        WHERE id = ?
        AND user_id = ?
    `;

    const [result] = await pool.execute(sql, [

        id,
        userId

    ]);

    return result;

}

export async function toggleTaskCompletion(
    id: number,
    userId: number
) {

    const sql = `
        UPDATE tasks
        SET completed = NOT completed
        WHERE id = ?
        AND user_id = ?
    `;

    const [result] = await pool.execute(sql, [

        id,
        userId

    ]);

    return result;

}

export async function searchTasks(title: string) {

    const sql = `
        SELECT *
        FROM tasks
        WHERE title LIKE ?
        ORDER BY create_at DESC
    `;

    const [rows] = await pool.execute(sql, [`%${title}%`]);

    return rows;

}

export async function filterByCategory(category: string) {

    const sql = `
        SELECT *
        FROM tasks
        WHERE category = ?
        ORDER BY create_at DESC
    `;

    const [rows] = await pool.execute(sql, [category]);

    return rows;

}

export async function filterByPriority(priority: string) {

    const sql = `
        SELECT *
        FROM tasks
        WHERE priority = ?
        ORDER BY create_at DESC
    `;

    const [rows] = await pool.execute(sql, [priority]);

    return rows;

}

export async function getCompletedTasks() {

    const sql = `
        SELECT *
        FROM tasks
        WHERE completed = 1
        ORDER BY create_at DESC
    `;

    const [rows] = await pool.query(sql);

    return rows;

}

export async function getPendingTasks() {

    const sql = `
        SELECT *
        FROM tasks
        WHERE completed = 0
        ORDER BY create_at DESC
    `;

    const [rows] = await pool.query(sql);

    return rows;

}