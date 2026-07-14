import { UserModel, type UserDocument } from '../data/mongo/models/user.model.ts';

export class UserService {
  authenticateUser = async (email: string, password: string): Promise<UserDocument | null> => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return null;
    }

    const user = await UserModel.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return null;
    }

    const passwordsMatch = await user.matchPassword(password);

    if (!passwordsMatch) {
      return null;
    }

    return user;
  };
}
