import fs from 'fs/promises';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

export const saveFile = async (file) => {
  await fs.mkdir(uploadDir, { recursive: true });
  const filename = Date.now() + '-' + file.originalname;
  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, file.buffer);
  return `/uploads/${filename}`;
};

export const deleteFile = async (filepath) => {
  const fullPath = path.join(process.cwd(), filepath);
  await fs.unlink(fullPath);
};