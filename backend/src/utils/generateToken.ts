import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';
import { env } from '../config/env.ts';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export const generateToken = (res: Response, userId: Types.ObjectId) => {
  const token = jwt.sign({ userId: userId.toString() }, env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: THIRTY_DAYS_IN_MS,
  });
};
