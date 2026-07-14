import type { Response } from 'express';

export const clearToken = (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire in the past
  });
};
