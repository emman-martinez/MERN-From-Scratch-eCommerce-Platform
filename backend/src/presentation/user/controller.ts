import type { Request, Response } from 'express';
import { UserService } from '../../services/user.service.ts';

export class UserController {
  constructor(private readonly userService: UserService) {}

  // @desc Auth user & get token
  // @route POST /api/users/login
  // @access Public
  authUser = async (req: Request, res: Response) => {
    res.send('Auth user');
  };

  // @desc Register a new user
  // @route POST /api/users
  // @access Public
  registerUser = async (req: Request, res: Response) => {
    res.send('Register user');
  };

  // @desc Logout user / clear cookie
  // @route POST /api/users/logout
  // @access Private
  logoutUser = async (req: Request, res: Response) => {
    res.send('Logout user');
  };

  // @desc Get user profile
  // @route GET /api/users/profile
  // @access Private
  getUserProfile = async (req: Request, res: Response) => {
    res.send('Get user profile');
  };

  // @desc Update user profile
  // @route PUT /api/users/profile
  // @access Private
  updateUserProfile = async (req: Request, res: Response) => {
    res.send('Update user profile');
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
