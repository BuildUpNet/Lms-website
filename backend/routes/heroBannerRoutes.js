import express from 'express';
import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  deleteHeroBanner,
  getActiveHeroBanners,
  getAllHeroBanners,
  setHeroBannerActive,
  setHeroBannerOrder,
  uploadHeroBanner,
} from '../controllers/heroBannerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '..', 'uploads', 'hero-banners');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDir),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `hero_${Date.now()}_${randomBytes(6).toString('hex')}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only JPG, PNG, and WEBP images are allowed'));
    }
  },
});

const router = express.Router();

router.get('/', getActiveHeroBanners);
router.get('/admin', authMiddleware, roleMiddleware('admin'), getAllHeroBanners);
router.post('/', authMiddleware, roleMiddleware('admin'), upload.single('image'), uploadHeroBanner);
router.patch('/:id/active', authMiddleware, roleMiddleware('admin'), setHeroBannerActive);
router.patch('/:id/order', authMiddleware, roleMiddleware('admin'), setHeroBannerOrder);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteHeroBanner);

export default router;
