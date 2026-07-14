import type { UserDocument } from '../data/mongo/models/user.model.ts';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export {};
