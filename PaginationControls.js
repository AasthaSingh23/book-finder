// src/components/PaginationControls.jsx
import React from 'react';

const PaginationControls = ({ currentPage, totalResults, resultsPerPage, onPageChange, isLoading }) => {
  // Calculate total number of pages needed
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  
  // Calculate range of books currently displayed (e.g., 1-10)
  const startRange = (currentPage - 1) * resultsPerPage + 1;
  const endRange = Math.min(currentPage * resultsPerPage, totalResults);

  // Determine if the Previous button should be disabled
  const isPrevDisabled = currentPage <= 1 || isLoading;
  
  // Determine if the Next button should be disabled
  // Note: The Google Books API maxes out at around 40 pages (400 results) for simple queries
  // We'll check against the calculated totalPages.
  const isNextDisabled = currentPage >= totalPages || totalResults === 0 || isLoading;

  if (totalResults === 0 || totalResults <= resultsPerPage) {
    return null; // Don't show controls if no results or only one page
  }

  return (
    <div className="flex justify-between items-center py-4 my-6 border-t border-b border-gray-200">
      {/* Result Information */}
      <div className="text-sm text-gray-700">
        Showing **{startRange}** to **{endRange}** of **{totalResults}** results
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPrevDisabled}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          &larr; Previous Page
        </button>

        <span className="self-center text-sm font-semibold text-indigo-700">
            Page {currentPage} / {totalPages}
        </span>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next Page &rarr;
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;