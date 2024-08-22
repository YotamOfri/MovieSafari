import { Schema } from 'mongoose';
import { ItemInformationRequest, UserWatchingType, ModernItem } from './types';
export const bookMarkSchema = new Schema({
  itemId: { type: Number, required: true },
  itemType: { type: String, required: true },
});

const episodeSchema = new Schema(
  {
    episode_id: { type: String, required: true, unique: true },
    episode_name: { type: String, required: true },
    watch_date: { type: Date, required: true },
  },
  { _id: false },
);

const seasonSchema = new Schema(
  {
    season_id: { type: String, required: true, unique: true },
    season_number: { type: Number, required: true },
    episodes: [episodeSchema],
  },
  { _id: false },
);

export const showSchema = new Schema(
  {
    show_id: { type: String, required: true, unique: true },
    show_name: { type: String, required: true },
    seasons: [seasonSchema],
  },
  { _id: false },
);

export interface userWatchingRequest {
  type: UserWatchingType;
  itemInformation: ItemInformationRequest;
}

export interface userBookMarkRequest {
  type: UserWatchingType;
  item: ModernItem;
  action: 'add' | 'remove';
}
