import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';
import { env } from '../config/env.ts';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export const generateToken = (res: Response, userId: Types.ObjectId) => {
  const token = jwt.sign({ userId: userId.toString() }, env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set the token in an HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    // Vercel and Render use different origins. `none` is required for the
    // browser to send the secure cookie between those services.
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'strict',
    path: '/',
    maxAge: THIRTY_DAYS_IN_MS,
  });
};
