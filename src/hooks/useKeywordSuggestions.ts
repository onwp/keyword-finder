import { useState, useEffect } from "react";
import { KeywordResult } from "@/types/keyword";

export const useKeywordSuggestions = (searchTerm: string) => {
  const [results, setResults] = useState<KeywordResult>({
    google: [],
    yahoo: [],
    bing: [],
    youtube: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults({
        google: [],
        yahoo: [],
        bing: [],
        youtube: [],
      });
      return;
    }

    setIsLoading(true);

    // Fetch Google suggestions
    fetchGoogleSuggestions(searchTerm);

    // Fetch Yahoo suggestions
    fetchYahooSuggestions(searchTerm);

    // Fetch Bing suggestions
    fetchBingSuggestions(searchTerm);

    // Fetch YouTube suggestions
    fetchYouTubeSuggestions(searchTerm);
  }, [searchTerm]);

  const fetchGoogleSuggestions = (query: string) => {
    const script = document.createElement("script");
    script.src = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&callback=handleGoogleResponse`;

    // Define the callback function in the global scope
    window.handleGoogleResponse = (data: [string, string[]]) => {
      setResults((prev) => ({ ...prev, google: data[1] }));
      document.body.removeChild(script);
      checkIfAllLoaded();
    };

    document.body.appendChild(script);
  };

  const fetchYahooSuggestions = (query: string) => {
    const script = document.createElement("script");
    script.src = `https://search.yahoo.com/sugg/gossip/gossip-us-ura/?command=${encodeURIComponent(query)}&output=jsonp&callback=handleYahooResponse`;

    // Define the callback function in the global scope
    window.handleYahooResponse = (data: {
      gossip: { results: { key: string }[] };
    }) => {
      const suggestions = data.gossip.results.map((item) => item.key);
      setResults((prev) => ({ ...prev, yahoo: suggestions }));
      document.body.removeChild(script);
      checkIfAllLoaded();
    };

    document.body.appendChild(script);
  };

  const fetchBingSuggestions = (query: string) => {
    const script = document.createElement("script");
    script.src = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(query)}&JsonType=callback&JsonCallback=handleBingResponse`;

    // Define the callback function in the global scope
    window.handleBingResponse = (data: [string, string[]]) => {
      setResults((prev) => ({ ...prev, bing: data[1] }));
      document.body.removeChild(script);
      checkIfAllLoaded();
    };

    document.body.appendChild(script);
  };

  const fetchYouTubeSuggestions = (query: string) => {
    const script = document.createElement("script");
    script.src = `https://suggestqueries.google.com/complete/search?client=chrome&ds=yt&q=${encodeURIComponent(query)}&callback=handleYouTubeResponse`;

    // Define the callback function in the global scope
    window.handleYouTubeResponse = (data: [string, string[]]) => {
      setResults((prev) => ({ ...prev, youtube: data[1] }));
      document.body.removeChild(script);
      checkIfAllLoaded();
    };

    document.body.appendChild(script);
  };

  const checkIfAllLoaded = () => {
    // Check if all APIs have returned results
    if (
      results.google.length > 0 &&
      results.yahoo.length > 0 &&
      results.bing.length > 0 &&
      results.youtube.length > 0
    ) {
      setIsLoading(false);
    }
  };

  return { results, isLoading };
};
