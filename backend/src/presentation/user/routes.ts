import { Router } from 'express';
import { UserController } from './controller.ts';
import asyncHandler from '../../middleware/asyncHandler.ts';
import { UserService } from '../../services/user.service.ts';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userService = new UserService();
    const controller = new UserController(userService);

    router
      .route('/')
      .post(asyncHandler(controller.registerUser.bind(controller)))
      .get(asyncHandler(controller.getUsers.bind(controller)));
    router.post('/logout', asyncHandler(controller.logoutUser.bind(controller)));
    router.post('/login', asyncHandler(controller.authUser.bind(controller)));
    router
      .route('/profile')
      .get(asyncHandler(controller.getUserProfile.bind(controller)))
      .put(asyncHandler(controller.updateUserProfile.bind(controller)));
    router
      .route('/:id')
      .get(asyncHandler(controller.getUserById.bind(controller)))
      .delete(asyncHandler(controller.deleteUser.bind(controller)))
      .put(asyncHandler(controller.updateUser.bind(controller)));

    return router;
  }
}
