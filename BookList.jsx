// src/components/BookList.jsx (Updated to receive favoriteIds)
import React from 'react';

// ... (extractBookData remains the same)

// Accept the new favoriteIds prop
const BookList = ({ books, onBookSelect, favoriteIds }) => { 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((item) => {
        const book = extractBookData(item);
        const isFav = favoriteIds.includes(item.id); // Check if book is a favorite
        
        return (
          <div 
            key={book.id} 
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer flex flex-col items-center text-center relative" // Added relative for absolute heart
            onClick={() => onBookSelect(item.id)} 
          >
            {/* Favorite Indicator */}
            {isFav && (
              <span className="absolute top-2 right-2 text-red-500 text-2xl" title="Favorited">
               ❤️
              </span>
            )}

            <img 
              src={book.coverImageUrl} 
              alt={`Cover of ${book.title}`} 
              className="w-32 h-48 object-cover rounded shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-indigo-600 mt-1">{book.authors}</p>
            <p className="text-xs text-gray-500 mt-1">Published: {book.publishedYear}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;