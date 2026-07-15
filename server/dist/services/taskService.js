import pool from "../config/database.js";
export async function getAllTasks() {
    const [rows] = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
    return rows;
}
