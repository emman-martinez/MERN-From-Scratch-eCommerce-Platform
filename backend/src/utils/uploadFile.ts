import multer from 'multer';
import path from 'node:path';

export const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => checkFileType(file, cb),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
