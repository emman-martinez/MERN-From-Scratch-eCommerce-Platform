import { Router } from 'express';
import { upload } from '../../utils/uploadFile.ts';
import asyncHandler from '../../middleware/asyncHandler.ts';
import { admin, protect } from '../../middleware/authMiddleware.ts';
import { UploadController } from './controller.ts';

export class UploadRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UploadController();

    router.post(
      '/',
      protect,
      admin,
      upload.single('image'),
      asyncHandler(controller.uploadFile.bind(controller)),
    );

    return router;
  }
}
