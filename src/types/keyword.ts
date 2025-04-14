export interface KeywordResult {
  google: string[];
  yahoo: string[];
  bing: string[];
  youtube: string[];
}

// Define the callback function types for the global window object
declare global {
  interface Window {
    handleGoogleResponse: (data: [string, string[]]) => void;
    handleYahooResponse: (data: {
      gossip: { results: { key: string }[] };
    }) => void;
    handleBingResponse: (data: [string, string[]]) => void;
    handleYouTubeResponse: (data: [string, string[]]) => void;
  }
}
