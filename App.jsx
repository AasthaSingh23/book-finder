// src/App.jsx (Updated imports and logic)

import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetailModal from './components/BookDetailModal';
import PaginationControls from './components/PaginationControls'; // New component
import { loadFavorites, toggleFavorite } from './utils/localStorage';
import './index.css'; 

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const RESULTS_PER_PAGE = 10; // Standard for Google Books API

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); 
  const [favoriteIds, setFavoriteIds] = useState([]);
  
  // New Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0); 

  useEffect(() => {
    setFavoriteIds(loadFavorites());
  }, []);

  const handleToggleFavorite = (bookId) => {
    const updatedFavorites = toggleFavorite(bookId, favoriteIds);
    setFavoriteIds(updatedFavorites);
  };
  
  // --- CORE API FETCHING LOGIC ---
  const fetchBooks = useCallback(async (query, page = 1) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setSearchTerm(query); 
    
    // Calculate the start index for the API call
    const startIndex = (page - 1) * RESULTS_PER_PAGE;

    try {
      // Add startIndex and maxResults to the URL
      const url = `${API_BASE_URL}${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        setBooks(data.items);
        setCurrentPage(page); // Set current page if successful
        setTotalResults(data.totalItems || 0); // Store total results
      } else {
        setBooks([]); 
        setTotalResults(0);
        setCurrentPage(1);
        // Only show error if searching for the first page
        if (page === 1) { 
            setError('No books found matching your search. Try a different query.');
        }
      }

    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to fetch data. Please check your network connection or try again later.');
      setBooks([]); 
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []); 

  // New: Wrapper function for search to always reset to page 1
  const handleInitialSearch = (query) => {
      // When a new search is initiated, start at page 1
      fetchBooks(query, 1);
  };

  // New: Handler for changing pages
  const handlePageChange = (newPage) => {
      // Fetch books for the current search term on the new page
      fetchBooks(searchTerm, newPage);
  };

  // ... (handleBookSelect and handleCloseModal remain the same)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 bg-indigo-700 shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wider">
          Book Finder 📚🔍
        </h1>
      </header>
      
      <main className="container mx-auto p-4 max-w-7xl">
        {/* Pass the initial search handler */}
        <SearchBar onSearch={handleInitialSearch} />
        
        <div className="mt-8">
          {/* ... (Loading, Error, Initial, and No Results states remain the same) */}
          
          {/* Book Results List */}
          {!loading && !error && books.length > 0 && (
            <>
              {/* Pagination Controls (Top) */}
              <PaginationControls
                currentPage={currentPage}
                totalResults={totalResults}
                resultsPerPage={RESULTS_PER_PAGE}
                onPageChange={handlePageChange}
                isLoading={loading}
              />
              
              <BookList 
                books={books} 
                onBookSelect={handleBookSelect} 
                favoriteIds={favoriteIds} 
              />

              {/* Pagination Controls (Bottom) */}
              <PaginationControls
                currentPage={currentPage}
                totalResults={totalResults}
                resultsPerPage={RESULTS_PER_PAGE}
                onPageChange={handlePageChange}
                isLoading={loading}
              />
            </>
          )}
        </div>
        
        {/* Detailed Book Modal... (remains the same) */}
        {selectedBook && (
          <BookDetailModal 
            book={selectedBook} 
            onClose={handleCloseModal} 
            isFavorite={favoriteIds.includes(selectedBook.id)} 
            onToggleFavorite={handleToggleFavorite} 
          />
        )}
      </main>
    </div>
  );
}

export default App;