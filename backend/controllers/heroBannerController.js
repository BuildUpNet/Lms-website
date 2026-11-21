import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let tableSetup;

const ensureHeroBannerTable = async () => {
  if (!tableSetup) {
    tableSetup = (async () => {
      await db.query(`
        CREATE TABLE IF NOT EXISTS hero_banners (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          image_url VARCHAR(500) NOT NULL,
          display_order INT NOT NULL DEFAULT 0,
          is_active TINYINT(1) NOT NULL DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);
      const [columns] = await db.query("SHOW COLUMNS FROM hero_banners LIKE 'display_order'");
      if (columns.length === 0) {
        await db.query('ALTER TABLE hero_banners ADD COLUMN display_order INT NOT NULL DEFAULT 0 AFTER image_url');
      }
    })();
  }

  const setup = tableSetup;
  try {
    await setup;
  } catch (error) {
    if (tableSetup === setup) tableSetup = null;
    throw error;
  }
};

export const getActiveHeroBanners = async (_req, res) => {
  try {
    await ensureHeroBannerTable();
    const [banners] = await db.query(
      'SELECT id, title, image_url, display_order, is_active FROM hero_banners ORDER BY id ASC'
    );
    res.status(200).json({
      success: true,
      data: banners.filter((banner) => Number(banner.is_active) === 1),
      hasBanners: banners.length > 0,
    });
  } catch (error) {
    console.error('Failed to load active hero banners:', error);
    res.status(500).json({ success: false, message: 'Failed to load hero banners' });
  }
};

export const getAllHeroBanners = async (_req, res) => {
  try {
    await ensureHeroBannerTable();
    const [banners] = await db.query(
      'SELECT id, title, image_url, display_order, is_active, created_at FROM hero_banners ORDER BY id DESC'
    );
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    console.error('Failed to load hero banners for admin:', error);
    res.status(500).json({ success: false, message: 'Failed to load hero banners' });
  }
};

export const uploadHeroBanner = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Select an image to upload' });
  }

  try {
    await ensureHeroBannerTable();
    const title = path.basename(req.file.originalname);
    const imageUrl = `/uploads/hero-banners/${req.file.filename}`;
    const [result] = await db.query(
      'INSERT INTO hero_banners (title, image_url) VALUES (?, ?)',
      [title, imageUrl]
    );
    res.status(201).json({
      success: true,
      message: 'Hero banner uploaded successfully',
      data: { id: result.insertId, title, image_url: imageUrl, display_order: 0, is_active: 1 },
    });
  } catch (error) {
    try {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    } catch (cleanupError) {
      console.error('Failed to remove an incomplete hero banner upload:', cleanupError);
    }
    console.error('Failed to upload hero banner:', error);
    res.status(500).json({ success: false, message: 'Failed to upload hero banner' });
  }
};

export const setHeroBannerActive = async (req, res) => {
  const { active } = req.body;
  if (typeof active !== 'boolean') {
    return res.status(400).json({ success: false, message: 'Active must be a boolean value' });
  }

  try {
    await ensureHeroBannerTable();
    const [rows] = await db.query('SELECT id FROM hero_banners WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hero banner not found' });
    }

    await db.query(
      'UPDATE hero_banners SET is_active = ? WHERE id = ?',
      [active ? 1 : 0, req.params.id]
    );
    res.status(200).json({ success: true, message: 'Hero banner status updated' });
  } catch (error) {
    console.error('Failed to update hero banner status:', error);
    res.status(500).json({ success: false, message: 'Failed to update hero banner status' });
  }
};

export const setHeroBannerOrder = async (req, res) => {
  const { display_order: displayOrder } = req.body;
  if (!Number.isInteger(displayOrder) || displayOrder < 0) {
    return res.status(400).json({ success: false, message: 'Display order must be a non-negative whole number' });
  }

  try {
    await ensureHeroBannerTable();
    const [rows] = await db.query('SELECT id FROM hero_banners WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hero banner not found' });
    }

    const [[{ bannerCount }]] = await db.query('SELECT COUNT(*) AS bannerCount FROM hero_banners');
    if (displayOrder > bannerCount) {
      return res.status(400).json({ success: false, message: `Display order cannot exceed ${bannerCount}` });
    }

    if (displayOrder > 0) {
      const [duplicates] = await db.query(
        'SELECT id FROM hero_banners WHERE display_order = ? AND id <> ? LIMIT 1',
        [displayOrder, req.params.id]
      );
      if (duplicates.length > 0) {
        return res.status(409).json({ success: false, message: 'This display order is already assigned to another banner' });
      }
    }

    await db.query(
      'UPDATE hero_banners SET display_order = ? WHERE id = ?',
      [displayOrder, req.params.id]
    );
    res.status(200).json({ success: true, message: 'Hero banner order updated', display_order: displayOrder });
  } catch (error) {
    console.error('Failed to update hero banner order:', error);
    res.status(500).json({ success: false, message: 'Failed to update hero banner order' });
  }
};

export const deleteHeroBanner = async (req, res) => {
  try {
    await ensureHeroBannerTable();
    const [banners] = await db.query(
      'SELECT image_url FROM hero_banners WHERE id = ?',
      [req.params.id]
    );
    if (banners.length === 0) {
      return res.status(404).json({ success: false, message: 'Hero banner not found' });
    }

    await db.query('DELETE FROM hero_banners WHERE id = ?', [req.params.id]);
    const [[{ bannerCount }]] = await db.query('SELECT COUNT(*) AS bannerCount FROM hero_banners');
    await db.query(
      'UPDATE hero_banners SET display_order = 0 WHERE display_order > ?',
      [bannerCount]
    );
    const filename = path.basename(banners[0].image_url);
    const filePath = path.join(__dirname, '..', 'uploads', 'hero-banners', filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.status(200).json({ success: true, message: 'Hero banner deleted' });
  } catch (error) {
    console.error('Failed to delete hero banner:', error);
    res.status(500).json({ success: false, message: 'Failed to delete hero banner' });
  }
};
