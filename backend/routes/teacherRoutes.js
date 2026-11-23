import express from 'express';
import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  getPublicTeachers,
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacherController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '..', 'uploads', 'faculty');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDir),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `faculty_${Date.now()}_${randomBytes(6).toString('hex')}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only JPG, PNG, and WEBP images are allowed'));
    }
  },
});

const router = express.Router();

router.get('/public', getPublicTeachers);

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/', getTeachers);
router.post('/', upload.single('image'), createTeacher);
router.put('/:id', upload.single('image'), updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;
