export interface IBookProviderParams {
  bookProvider: string;
  page?: number;
}

export interface LibgenBook {
  id: string;
  title: string;
  tempAuthor: string;
  author: string[];
  publisher: string;
  year: string;
  language: string;
  format: string;
  size: string;
  pages: string;
  link: string;
  image: string;
  description: string;
  tableOfContents: string;
  edition: string;
  volume: string;
  topic: string;
  series: string;
  isbn: string[];
  hashes: Hashes;
}

interface Hashes {
  AICH: string;
  CRC32: string;
  eDonkey: string;
  MD5: string;
  SHA1: string;
  SHA256: string[];
  TTH: string;
}
export type UserWatchingType = 'anime' | 'modern';
export interface Episode {
  episodeId: string;
  episodeNumber: number;
  episodeName: string;
  watchDate: Date;
}
export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

export interface ItemInformationRequest {
  title: string;
  itemId: string;
  itemType: string;
  currentSeason: number;
  currentEpisode: number;
  watchHistory: Array<Season>;
}
export type ModernItem = {
  itemId: Number;
  itemType: String;
};
interface IEpisode {
  episode_id: string;
  episode_name: string;
  watch_date: Date;
}

// Define Season Type
interface ISeason {
  season_id: string;
  season_number: number;
  episodes: IEpisode[];
}

// Define Show Type
export interface IShow {
  show_id: string;
  show_name: string;
  seasons: ISeason[];
}
