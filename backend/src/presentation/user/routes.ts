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
      .get(protect, admin, controller.getUsers);
    router.post('/logout', asyncHandler(controller.logoutUser.bind(controller)));
    router.post('/auth', asyncHandler(controller.authUser.bind(controller)));
    router
      .route('/profile')
      .get(protect, controller.getUserProfile)
      .put(protect, controller.updateUserProfile);
    router
      .route('/:id')
      .get(protect, admin, controller.getUserById)
      .delete(protect, admin, controller.deleteUser)
      .put(protect, admin, controller.updateUser);

    return router;
  }
}
