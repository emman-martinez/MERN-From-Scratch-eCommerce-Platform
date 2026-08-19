import type { Response } from 'express';

export const clearToken = (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    path: '/',
    expires: new Date(0), // Set the cookie to expire in the past
  });
};
