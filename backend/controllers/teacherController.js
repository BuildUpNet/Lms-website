import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let teacherProfileColumnsSetup;

const ensureTeacherProfileColumns = async () => {
  if (!teacherProfileColumnsSetup) {
    teacherProfileColumnsSetup = (async () => {
      const [imageColumns] = await db.query("SHOW COLUMNS FROM teachers LIKE 'profile_image'");
      if (imageColumns.length === 0) {
        await db.query('ALTER TABLE teachers ADD COLUMN profile_image VARCHAR(500) NULL');
      }

      const [experienceColumns] = await db.query("SHOW COLUMNS FROM teachers LIKE 'years_experience'");
      if (experienceColumns.length === 0) {
        await db.query('ALTER TABLE teachers ADD COLUMN years_experience INT UNSIGNED NULL');
      }
    })();
  }

  const setup = teacherProfileColumnsSetup;
  try {
    await setup;
  } catch (error) {
    if (teacherProfileColumnsSetup === setup) teacherProfileColumnsSetup = null;
    throw error;
  }
};

const removeUploadedProfile = (file) => {
  if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
};

const removeProfileImage = (imageUrl) => {
  if (!imageUrl || !imageUrl.startsWith('/uploads/faculty/')) return;
  const imagePath = path.join(__dirname, '..', 'uploads', 'faculty', path.basename(imageUrl));
  if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
};

export const getTeachers = async (req, res) => {
  try {
    await ensureTeacherProfileColumns();
    const [teachers] = await db.query(`
      SELECT t.*, u.username
      FROM teachers t
      INNER JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `);
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicTeachers = async (_req, res) => {
  try {
    await ensureTeacherProfileColumns();
    const [teachers] = await db.query(`
      SELECT id, first_name, last_name, specialization, profile_image, years_experience
      FROM teachers
      WHERE status = 'active'
      ORDER BY created_at DESC
    `);
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    console.error('Failed to load public faculty:', error);
    res.status(500).json({ success: false, message: 'Failed to load faculty' });
  }
};

export const createTeacher = async (req, res) => {
  const connection = await db.getConnection();
  let transactionStarted = false;
  try {
    await ensureTeacherProfileColumns();
    await connection.beginTransaction();
    transactionStarted = true;

    const {
      username, password, employee_id, first_name, last_name, phone, email,
      specialization, joining_date, status, years_experience,
    } = req.body;

    if (!username || !password || !employee_id || !first_name || !phone) {
      await connection.rollback();
      removeUploadedProfile(req.file);
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!/^\d{10}$/.test(phone)) {
      await connection.rollback();
      removeUploadedProfile(req.file);
      return res.status(400).json({ success: false, message: 'Phone must be exactly 10 digits' });
    }

    const experience = years_experience === '' || years_experience === undefined
      ? null
      : Number(years_experience);
    if (experience !== null && (!Number.isInteger(experience) || experience < 0)) {
      await connection.rollback();
      removeUploadedProfile(req.file);
      return res.status(400).json({ success: false, message: 'Experience must be a non-negative whole number' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userResult] = await connection.query(
      `INSERT INTO users (username, password, role, status) VALUES (?, ?, 'teacher', 'active')`,
      [username, hashedPassword]
    );

    const user_id = userResult.insertId;

    const [teacherResult] = await connection.query(
      `INSERT INTO teachers
       (user_id, employee_id, first_name, last_name, phone, email, specialization, joining_date, status, profile_image, years_experience)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, employee_id, first_name, last_name || null, phone, email || null,
        specialization || null, joining_date || null, status || 'active',
        req.file ? `/uploads/faculty/${req.file.filename}` : null, experience,
      ]
    );

    await connection.commit();
    transactionStarted = false;
    res.status(201).json({ success: true, message: 'Teacher created successfully', data: { id: teacherResult.insertId, user_id, username, employee_id } });
  } catch (error) {
    if (transactionStarted) await connection.rollback();
    removeUploadedProfile(req.file);
    console.error('Failed to create teacher:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.message.includes('username')) return res.status(400).json({ success: false, message: 'Username already exists' });
      if (error.message.includes('employee_id')) return res.status(400).json({ success: false, message: 'Employee ID already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to create teacher' });
  } finally {
    connection.release();
  }
};

export const updateTeacher = async (req, res) => {
  const connection = await db.getConnection();
  let transactionStarted = false;
  try {
    await ensureTeacherProfileColumns();
    await connection.beginTransaction();
    transactionStarted = true;
    const { id } = req.params;
    const {
      first_name, last_name, phone, email, specialization, joining_date, status,
      years_experience,
    } = req.body;
    const [existingTeachers] = await connection.query(
      'SELECT profile_image FROM teachers WHERE id = ?',
      [id]
    );
    if (existingTeachers.length === 0) {
      await connection.rollback();
      transactionStarted = false;
      removeUploadedProfile(req.file);
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    if (!first_name) {
      await connection.rollback();
      transactionStarted = false;
      removeUploadedProfile(req.file);
      return res.status(400).json({ success: false, message: 'First name is required' });
    }

    if (!/^\d{10}$/.test(phone || '')) {
      await connection.rollback();
      transactionStarted = false;
      removeUploadedProfile(req.file);
      return res.status(400).json({ success: false, message: 'Phone must be exactly 10 digits' });
    }

    const experience = years_experience === '' || years_experience === undefined
      ? null
      : Number(years_experience);
    if (experience !== null && (!Number.isInteger(experience) || experience < 0)) {
      await connection.rollback();
      transactionStarted = false;
      removeUploadedProfile(req.file);
      return res.status(400).json({ success: false, message: 'Experience must be a non-negative whole number' });
    }

    await connection.query(
      `UPDATE teachers
       SET first_name=?, last_name=?, phone=?, email=?, specialization=?, joining_date=?, status=?,
           profile_image=COALESCE(?, profile_image), years_experience=?
       WHERE id=?`,
      [
        first_name, last_name || null, phone, email || null, specialization || null,
        joining_date || null, status || 'active',
        req.file ? `/uploads/faculty/${req.file.filename}` : null, experience, id,
      ]
    );

    await connection.commit();
    transactionStarted = false;
    if (req.file) removeProfileImage(existingTeachers[0].profile_image);
    res.status(200).json({ success: true, message: 'Teacher updated successfully' });
  } catch (error) {
    if (transactionStarted) await connection.rollback();
    removeUploadedProfile(req.file);
    console.error('Failed to update teacher:', error);
    res.status(500).json({ success: false, message: 'Failed to update teacher' });
  } finally {
    connection.release();
  }
};

export const deleteTeacher = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await ensureTeacherProfileColumns();
    await connection.beginTransaction();
    const { id } = req.params;

    const [rows] = await connection.query('SELECT user_id, profile_image FROM teachers WHERE id = ?', [id]);
    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    await connection.query('DELETE FROM teachers WHERE id = ?', [id]);
    await connection.query('DELETE FROM users WHERE id = ?', [rows[0].user_id]);

    await connection.commit();
    removeProfileImage(rows[0].profile_image);
    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};
