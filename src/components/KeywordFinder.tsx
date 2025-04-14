import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ResultsTable from "./ResultsTable";
import { useKeywordSuggestions } from "@/hooks/useKeywordSuggestions";

const KeywordFinder = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { results, isLoading } = useKeywordSuggestions(searchTerm);

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

export default KeywordFinder;
