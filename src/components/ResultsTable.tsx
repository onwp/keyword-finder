import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ResultsTableProps {
  results: {
    google: string[];
    yahoo: string[];
    bing: string[];
    youtube: string[];
  };
  isLoading?: boolean;
}

const ResultsTable = ({
  results = {
    google: [],
    yahoo: [],
    bing: [],
    youtube: [],
  },
  isLoading = false,
}: ResultsTableProps) => {
  // Find the maximum number of results across all platforms
  const maxResults = Math.max(
    results.google.length,
    results.yahoo.length,
    results.bing.length,
    results.youtube.length,
  );

  // Create rows based on the maximum number of results
  const rows = Array.from({ length: maxResults }, (_, i) => i);

  if (isLoading) {
    return (
      <div className="w-full text-center py-8 bg-white">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  if (maxResults === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-auto bg-white rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Google</TableHead>
            <TableHead className="font-semibold">Yahoo</TableHead>
            <TableHead className="font-semibold">Bing</TableHead>
            <TableHead className="font-semibold">YouTube</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                {results.google[rowIndex] && (
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(results.google[rowIndex])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {results.google[rowIndex]}
                  </a>
                )}
              </TableCell>
              <TableCell>
                {results.yahoo[rowIndex] && (
                  <a
                    href={`https://search.yahoo.com/search?p=${encodeURIComponent(results.yahoo[rowIndex])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {results.yahoo[rowIndex]}
                  </a>
                )}
              </TableCell>
              <TableCell>
                {results.bing[rowIndex] && (
                  <a
                    href={`http://www.bing.com/search?q=${encodeURIComponent(results.bing[rowIndex])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {results.bing[rowIndex]}
                  </a>
                )}
              </TableCell>
              <TableCell>
                {results.youtube[rowIndex] && (
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(results.youtube[rowIndex])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {results.youtube[rowIndex]}
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultsTable;
