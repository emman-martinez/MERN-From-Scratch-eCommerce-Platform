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

  registerUser = async (name: string, email: string, password: string): Promise<UserDocument> => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UserModel.findOne({ email: normalizedEmail });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new UserModel({
      name,
      email: normalizedEmail,
      password,
    });

    await user.save();

    return user;
  };
}
