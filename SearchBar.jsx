// src/components/SearchBar.jsx

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  // State to hold the current value of the search input
  const [query, setQuery] = useState('');

  // Handler for when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    // Trim and check if the query is not empty before calling the parent handler
    if (query.trim()) {
      onSearch(query.trim());
    }
    // Optional: setQuery(''); // Clear the input after search
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-4 bg-gray-100 shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Enter book title, author, or ISBN..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-3 border border-gray-300 rounded-l-lg w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700 transition duration-150 ease-in-out font-semibold disabled:opacity-50"
        disabled={!query.trim()}
      >
        Search 📚
      </button>
    </form>
  );
};

export default SearchBar;