import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { User } from "../types/user.js";

export async function registerUser(user: User) {
const [existing]: any = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [user.email]
);

if (existing.length > 0) {
    throw new Error("Email already registered");
}
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO users(name, email, password)
        VALUES (?, ?, ?)
    `;

    const [result]: any = await pool.execute(sql, [
        user.name,
        user.email,
        hashedPassword
    ]);

    return {
        id: result.insertId
    };

}

export async function loginUser(
    email: string,
    password: string
) {

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    const [rows]: any = await pool.execute(sql, [email]);

    if (rows.length === 0) {

        throw new Error("User not found");

    }

    const user = rows[0];

    const match = await bcrypt.compare(
        password,
        user.password
    );

    if (!match) {

        throw new Error("Invalid password");

    }

    const token = generateToken(user.id);

    return {

        token,

        user: {

            id: user.id,

            name: user.name,

            email: user.email

        }

    };

}