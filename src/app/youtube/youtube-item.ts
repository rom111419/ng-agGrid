export interface IYoutubeItemSnippet {
  channelId?: string;
  channelTitle?: string;
  description?: string;
  liveBroadcastContent?: string;
  publishedAt?: string;
  thumbnails?: {
    default?: {
      height?: number;
      url?: string;
      width?: number;
    }
    high?: {
      height?: number;
      url?: string;
      width?: number;
    }
    medium?: {
      height?: number;
      url?: string;
      width?: number;
    }
  };
  title?: string;
  thumbnails2: string;
  rowHeight?: number;
}

export interface IYoutubeItem {
  etag?: string;
  id?: { kind?: string, videoId?: string };
  kind?: string;
  snippet?: IYoutubeItemSnippet[];
}

export interface IYoutubeList {
  etag?: string;
  kind?: string;
  items?: IYoutubeItem[];
  nextPageToken?: string;
  pageInfo?: { totalResults: number, resultsPerPage: number };
  regionCode?: string;
}
