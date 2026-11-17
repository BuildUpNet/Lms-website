import mysql from "mysql2/promise";
import dotenv from "dotenv"

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const connectDB = async () => {
    let connection;
    try {
        connection = await pool.getConnection();

        const [courseTables] = await connection.query(
            `SELECT 1 FROM information_schema.tables
             WHERE table_schema = DATABASE() AND table_name = 'courses'
             LIMIT 1`
        );
        if (courseTables.length === 0) {
            throw new Error("The courses table does not exist");
        }

        console.log("MySQL connected successfully!");
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
        process.exit(1);
    } finally {
        if (connection) connection.release();
    }
};

export default pool;
