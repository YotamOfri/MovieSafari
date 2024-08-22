import mongoose, { Schema, Document } from 'mongoose';
import { ModernItem, IShow } from './types';
import { bookMarkSchema, showSchema } from './requests';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  modern: {
    bookmarks: [ModernItem];
    watching: [IShow];
    seen: [IShow];
  };
  anime: { bookmarks: string[]; watching: string[]; seen: string[] };
}
export interface IUserInput {
  username: string;
  email: string;
  password: string;
  modern: { bookmarks: ModernItem[]; watching: IShow[]; seen: IShow[] };
  anime: { bookmarks: string[]; watching: IShow[]; seen: IShow[] };
}
const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  modern: {
    bookmarks: [bookMarkSchema],
    watching: [showSchema],
    seen: [showSchema],
  },
  anime: {
    bookmarks: [bookMarkSchema],
    watching: [showSchema],
    seen: [showSchema],
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
