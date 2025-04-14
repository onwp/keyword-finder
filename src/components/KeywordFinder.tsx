import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ResultsTable from "./ResultsTable";

interface KeywordResult {
  google: string[];
  yahoo: string[];
  bing: string[];
  youtube: string[];
}

const KeywordFinder = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Keyword Finder</h2>
        <p className="text-gray-600 mb-6 text-center">
          Discover related keywords from Google, Yahoo, Bing, and YouTube in
          real-time.
        </p>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Enter your search term..."
            className="w-full p-4 text-lg"
            value={searchTerm}
            onChange={handleSearchChange}
            autoFocus
          />
        </div>

        {searchTerm.trim() !== "" && (
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
            <ResultsTable results={results} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Add TypeScript interface for the global window object
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

export default KeywordFinder;
