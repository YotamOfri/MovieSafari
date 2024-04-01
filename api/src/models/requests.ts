type UserWatchingType = 'anime' | 'modern';

export interface usersWatchingRequest {
  type: UserWatchingType;
  itemId: number;
}
