import { Schema } from 'mongoose';
type UserWatchingType = 'anime' | 'modern';
export type ModernItem = {
  itemId: Number;
  itemType: String;
};
export const modernItemSchema = new Schema({
  itemId: { type: Number, required: true },
  itemType: { type: String, required: true },
});
export interface usersWatchingRequest {
  type: UserWatchingType;
  item: ModernItem;
  action: 'add' | 'remove';
}
