import bcrypt from 'bcrypt';
import db from '../config/db.js';

export const getStudents = async (_req, res) => {
  try {
    const [students] = await db.query(`
      SELECT s.id, s.user_id, s.admission_number, s.first_name, s.last_name,
             s.date_of_birth, s.gender, s.phone, s.address,
             s.admission_date, s.status, u.username
      FROM students s
      INNER JOIN users u ON s.user_id = u.id
      ORDER BY s.id DESC
    `);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const {
      username, password, admission_number, first_name, last_name,
      date_of_birth, gender, phone, address, admission_date, status,
    } = req.body;

    if (
      typeof username !== 'string' || !username.trim() ||
      typeof password !== 'string' || !password ||
      typeof admission_number !== 'string' || !admission_number.trim() ||
      typeof first_name !== 'string' || !first_name.trim()
    ) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Username, password, admission number, and first name are required' });
    }

    if (password.length < 6) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    if (phone && !/^\d{10,15}$/.test(phone)) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Phone must contain 10 to 15 digits' });
    }

    if (
      (last_name != null && typeof last_name !== 'string') ||
      (address != null && typeof address !== 'string') ||
      (phone != null && typeof phone !== 'string')
    ) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Invalid student details' });
    }

    if (gender && !['male', 'female', 'other'].includes(gender)) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Gender must be male, female, or other' });
    }

    if (status && !['active', 'inactive'].includes(status)) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Status must be active or inactive' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userResult] = await connection.query(
      `INSERT INTO users (username, password, role, status) VALUES (?, ?, 'student', 'active')`,
      [username.trim(), hashedPassword]
    );

    const userId = userResult.insertId;
    const [studentResult] = await connection.query(
      `INSERT INTO students
        (user_id, admission_number, first_name, last_name, date_of_birth, gender, phone, address, admission_date, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        admission_number.trim(),
        first_name.trim(),
        last_name?.trim() || null,
        date_of_birth || null,
        gender || null,
        phone || null,
        address || null,
        admission_date || null,
        status || 'active',
      ]
    );

    await connection.commit();
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: { id: studentResult.insertId, user_id: userId, username: username.trim(), admission_number: admission_number.trim() },
    });
  } catch (error) {
    await connection.rollback();
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.message.includes('username')) return res.status(400).json({ success: false, message: 'Username already exists' });
      if (error.message.includes('admission_number')) return res.status(400).json({ success: false, message: 'Admission number already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

export const deleteStudent = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query('SELECT user_id FROM students WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    await connection.query('DELETE FROM students WHERE id = ?', [req.params.id]);
    await connection.query('DELETE FROM users WHERE id = ?', [rows[0].user_id]);
    await connection.commit();
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};
