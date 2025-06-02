import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    shopNames: [{
      type: String,
      required: true,
    }],
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds) || 10,
  );
  next();
});

// Remove password from JSON responses
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Compare password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Find user by username
userSchema.statics.findByUsername = async function (
  username: string,
): Promise<IUser | null> {
  return this.findOne({ username }).select('+password');
};

// Check user existence by ID
userSchema.statics.checkUserExist = async function (
  userId: string,
): Promise<IUser | null> {
  return this.findById(userId);
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);
export default User;