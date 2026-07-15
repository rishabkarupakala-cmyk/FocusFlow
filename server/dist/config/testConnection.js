import pool from "./database.js";
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database Connected!");
        connection.release();
    }
    catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error);
    }
}
testConnection();
