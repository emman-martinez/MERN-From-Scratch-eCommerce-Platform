import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.ts';
import { UserModel } from './../data/mongo/models/index.ts';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  // Read the JWT from the cookies
  const token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token and decode the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
      const user = await UserModel.findById(decoded.userId).select('-password');

      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const isAdmin = req?.user?.isAdmin;

  if (user && isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
