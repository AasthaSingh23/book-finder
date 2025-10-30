// src/components/BookDetailModal.jsx (Updated to handle favorites)
import React from 'react';

// ... (getDetailInfo remains the same)

// Accept isFavorite and onToggleFavorite props
const BookDetailModal = ({ book, onClose, isFavorite, onToggleFavorite }) => { 
  const detail = getDetailInfo(book);

  // Determine button styles based on favorite status
  const favoriteButtonClasses = isFavorite
    ? "bg-red-500 hover:bg-red-600 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4"
      onClick={onClose} 
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header with Title and Close button */}
        <div className="flex justify-between items-start border-b p-4 sm:p-6 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-indigo-700">{detail.title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-900 text-3xl font-light leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ... (Cover Image Column remains the same) */}
          <div className="md:col-span-1 flex justify-center">
            <img 
              src={detail.coverImageUrl} 
              alt={`Cover of ${detail.title}`} 
              className="w-full max-w-xs object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Details Column */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-lg text-indigo-600 font-semibold border-b pb-2">
              By: {detail.authors}
            </p>

            {/* Book Metadata and Description... (remain the same) */}
            <div className="text-sm">
                <p><strong>Publisher:</strong> {detail.publisher}</p>
                <p><strong>Published Date:</strong> {detail.publishedDate}</p>
                <p><strong>Page Count:</strong> {detail.pageCount}</p>
                <p><strong>ISBN-13:</strong> {detail.isbn}</p>
            </div>
            
            <div>
              <h4 className="font-bold mt-4 mb-2 text-gray-700">Description</h4>
              <p className="text-gray-600 text-sm italic">
                {detail.description.length > 500 
                  ? detail.description.substring(0, 500) + '...'
                  : detail.description}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {/* Toggle Favorite Button */}
              <button
                onClick={() => onToggleFavorite(book.id)} // Pass the book ID to the handler
                className={`px-4 py-2 font-semibold rounded-lg transition ${favoriteButtonClasses}`}
              >
                {isFavorite ? '❤️ Remove from Favorites' : '☆ Add to Favorites'}
              </button>

              {/* Preview Link */}
              {detail.previewLink && (
                <a 
                  href={detail.previewLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  View Book Preview
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 border-t flex justify-end">
             <button 
                onClick={onClose} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;