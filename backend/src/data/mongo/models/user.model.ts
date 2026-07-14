import { model, Model, Schema, type HydratedDocument } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

type UserModelType = Model<User, object, UserMethods>;
export type UserDocument = HydratedDocument<User, UserMethods>;

const userSchema = new Schema<User, UserModelType, UserMethods>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const UserModel = model('User', userSchema);
