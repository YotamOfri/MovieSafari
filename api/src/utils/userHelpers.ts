import { User } from '../models';
import bcrypt from 'bcrypt';
import { IUserInput, IUser } from '../models/user';
const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const { username, email, password } = userData;
  // Check for duplicates
  const duplicateUsername = await User.findOne({ username }).lean().exec();
  if (duplicateUsername) throw new Error('Username Taken');
  const duplicateEmail = await User.findOne({ email }).lean().exec();
  if (duplicateEmail) throw new Error('Email Taken');
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create User Object
  const userObject: IUserInput = {
    username: username,
    email: email,
    password: hashedPassword,
    modern: { watching: [], bookmarks: [], seen: [] },
    anime: { watching: [], bookmarks: [], seen: [] },
  };
  // Create and Store User
  const user: IUser = await User.create(userObject);
  return user;
};

export { createUser };
