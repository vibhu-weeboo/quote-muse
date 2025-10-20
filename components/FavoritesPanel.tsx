import React from 'react';

// --- ICONS ---

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// --- COMPONENT ---

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (quote: string) => void;
}

const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ isOpen, onClose, favorites, onRemoveFavorite }) => {
  return (
    <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Panel */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#2a2a2e] shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between p-6 border-b border-[#b89b70]/20">
                <h2 className="text-2xl font-serif-display text-[#f5eeda]">Saved Quotes</h2>
                <button onClick={onClose} aria-label="Close favorites panel" className="text-[#a1968b]/80 hover:text-[#f5eeda] transition-colors">
                    <CloseIcon />
                </button>
            </header>

            <div className="flex-grow p-6 overflow-y-auto">
                {favorites.length > 0 ? (
                    <ul className="space-y-6">
                        {favorites.map((quote, index) => (
                            <li key={index} className="group flex items-start gap-4 p-4 border border-transparent hover:border-[#b89b70]/30 rounded-lg transition-all">
                                <span className="text-xl font-serif-display text-[#b89b70] select-none">&ldquo;</span>
                                <p className="flex-grow italic text-[#e0dace] leading-relaxed">{quote}</p>
                                <button onClick={() => onRemoveFavorite(quote)} aria-label="Remove favorite quote" className="opacity-0 group-hover:opacity-100 text-[#a1968b]/60 hover:text-red-400 transition-all duration-200 mt-1">
                                    <TrashIcon />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-[#a1968b]">
                        <p className="font-serif-display text-xl">Your journal is empty.</p>
                        <p className="mt-2 text-sm">Favorite quotes you generate will appear here.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPanel;
