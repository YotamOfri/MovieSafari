import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  modern: { bookmarks: string[]; watching: string[]; seen: string[] };
  anime: { bookmarks: string[]; watching: string[]; seen: string[] };
}
export interface IUserInput {
  username: string;
  email: string;
  password: string;
  modern: { bookmarks: string[]; watching: string[]; seen: string[] };
  anime: { bookmarks: string[]; watching: string[]; seen: string[] };
}
const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  modern: {
    bookmarks: [{ type: String }],
    watching: [{ type: String }],
    seen: [{ type: String }],
  },
  anime: {
    bookmarks: [{ type: String }],
    watching: [{ type: String }],
    seen: [{ type: String }],
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
