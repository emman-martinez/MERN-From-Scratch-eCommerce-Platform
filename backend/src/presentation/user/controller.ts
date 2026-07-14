import type { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from '../../services/user.service.ts';
import { loginSchema } from '../../schemas/index.ts';
import { clearToken, generateToken } from '../../utils/index.ts';

export class UserController {
  constructor(private readonly userService: UserService) {}

  // @desc Auth user & get token
  // @route POST /api/users/login
  // @access Public
  authUser = async (req: Request, res: Response) => {
    const parsedBody = loginSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({
        message: 'Invalid login data',
        errors: z.flattenError(parsedBody.error).fieldErrors,
      });
      return;
    }

    const { email, password } = parsedBody.data;
    const user = await this.userService.authenticateUser(email, password);

    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  };

  // @desc Register a new user
  // @route POST /api/users
  // @access Public
  registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await this.userService.registerUser(name, email, password);

    if (!user) {
      res.status(400);
      throw new Error('Invalid user data');
    }

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  };

  // @desc Logout user / clear cookie
  // @route POST /api/users/logout
  // @access Private
  logoutUser = async (req: Request, res: Response) => {
    clearToken(res);
    res.status(200).json({ message: 'User logged out successfully' });
  };

  // @desc Get user profile
  // @route GET /api/users/profile
  // @access Private
  getUserProfile = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401);
      throw new Error('User not authenticated');
    }

    const user = await this.userService.getUserProfile(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  };

  // @desc Update user profile
  // @route PUT /api/users/profile
  // @access Private
  updateUserProfile = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401);
      throw new Error('User not authenticated');
    }

    const { name, email, password } = req.body;
    const userExist = await this.userService.getUserProfile(userId);

    if (!userExist) {
      res.status(404);
      throw new Error('User not found');
    }

    const user = await this.userService.updateUserProfile(userExist, name, email, password);

    res.status(200).json({
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      isAdmin: user?.isAdmin,
    });
  };

  // @desc Get all users
  // @route GET /api/users
  // @access Private/Admin
  getUsers = async (req: Request, res: Response) => {
    res.send('Get all users');
  };

  // @desc Get user by ID
  // @route GET /api/users/:id
  // @access Private/Admin
  getUserById = async (req: Request, res: Response) => {
    res.send('Get user by ID');
  };

  // @desc Delete user
  // @route DELETE /api/users/:id
  // @access Private/Admin
  deleteUser = async (req: Request, res: Response) => {
    res.send('Delete user');
  };

  // @desc Update user
  // @route PUT /api/users/:id
  // @access Private/Admin
  updateUser = async (req: Request, res: Response) => {
    res.send('Update user');
  };
}
