import { Router } from 'express';
import { UserController } from './controller.ts';
import asyncHandler from '../../middleware/asyncHandler.ts';
import { UserService } from '../../services/user.service.ts';
import { protect, admin } from '../../middleware/authMiddleware.ts';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userService = new UserService();
    const controller = new UserController(userService);

    router
      .route('/')
      .post(asyncHandler(controller.registerUser.bind(controller)))
      .get(protect, admin, asyncHandler(controller.getUsers.bind(controller)));
    router.post('/logout', asyncHandler(controller.logoutUser.bind(controller)));
    router.post('/auth', asyncHandler(controller.authUser.bind(controller)));
    router
      .route('/profile/:id')
      .get(protect, asyncHandler(controller.getUserProfile.bind(controller)))
      .put(protect, asyncHandler(controller.updateUserProfile.bind(controller)));
    router
      .route('/:id')
      .get(protect, admin, asyncHandler(controller.getUserById.bind(controller)))
      .delete(protect, admin, asyncHandler(controller.deleteUser.bind(controller)))
      .put(protect, admin, asyncHandler(controller.updateUser.bind(controller)));

    return router;
  }
}
