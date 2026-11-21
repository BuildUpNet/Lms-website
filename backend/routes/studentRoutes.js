import express from 'express';
import { createStudent, deleteStudent, getStudents } from '../controllers/studentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/', getStudents);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);

export default router;
