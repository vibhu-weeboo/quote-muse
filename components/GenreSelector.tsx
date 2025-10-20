import React from 'react';
import { QuoteGenre } from '../types';

interface GenreSelectorProps {
  selectedGenre: QuoteGenre;
  onSelectGenre: (genre: QuoteGenre) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ selectedGenre, onSelectGenre }) => {
  const genres = Object.values(QuoteGenre);

  return (
    <div className="flex flex-wrap justify-center gap-3 my-8">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelectGenre(genre)}
          className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ease-in-out border
            ${selectedGenre === genre
              ? 'bg-[#b89b70] text-[#1e1e22] border-[#b89b70] font-medium shadow-sm'
              : 'bg-transparent text-[#e0dace] border-[#b89b70]/40 hover:bg-[#b89b70]/10 hover:border-[#b89b70]/80'
            }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreSelector;