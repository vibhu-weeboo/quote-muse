
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { QuoteGenre } from './types';
import { generateQuote } from './services/geminiService';
import { getFavorites, saveFavorites } from './services/favoritesService';
import GenreSelector from './components/GenreSelector';
import QuoteDisplay from './components/QuoteDisplay';
import Loader from './components/Loader';
import FlourishDivider from './components/FlourishDivider';
import SubtleDivider from './components/SubtleDivider';
import FavoritesPanel from './components/FavoritesPanel';

// --- ICONS ---

const TwitterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const FacebookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
    </svg>
);

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const SettingsIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0 2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const QuillIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2l-5.64 5.64a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L22 4.41V2zM12 11l-1 1-5 5-2 2a2.828 2.828 0 0 0 4 4l2-2 5-5 1-1"></path>
        <path d="M12 11l6-6"></path>
        <path d="M3 21l4-4"></path>
    </svg>
);

const HeartIcon: React.FC<{isFilled: boolean; className?: string}> = ({ isFilled, className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ProfileIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.234-5.234 1.912 5.234 1.912L12 17.292l1.912-5.234 5.234-1.912-5.234-1.912L12 3z"/>
    <path d="M5 3v4"/>
    <path d="M19 17v4"/>
    <path d="M3 5h4"/>
    <path d="M17 19h4"/>
  </svg>
);


// --- COMPONENTS ---

interface ShareButtonsProps {
  quote: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ quote }) => {
  const [copied, setCopied] = useState(false);
  const appUrl = "https://quotemuse.ai";
  const shareText = `"${quote}"`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const fullTwitterText = `${shareText} #QuoteMuse`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullTwitterText)}&url=${encodeURIComponent(appUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}&quote=${encodeURIComponent(shareText)}`;

  return (
    <>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="text-[#a1968b]/80 hover:text-[#f5eeda] transition-colors duration-200 transform hover:scale-110">
        <TwitterIcon />
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="text-[#a1968b]/80 hover:text-[#f5eeda] transition-colors duration-200 transform hover:scale-110">
        <FacebookIcon />
      </a>
      <button onClick={handleCopy} aria-label="Copy quote to clipboard" className="text-[#a1968b]/80 hover:text-[#f5eeda] transition-colors duration-200 relative transform hover:scale-110">
        <CopyIcon />
        {copied && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a2a2e] text-[#f5eeda] text-xs px-2 py-1 rounded-md shadow-lg animate-fade-in">
            Copied!
          </div>
        )}
      </button>
    </>
  );
};

interface QuoteActionsProps {
  quote: string;
  isFavorite: boolean;
  onToggleFavorite: (quote: string) => void;
}

const QuoteActions: React.FC<QuoteActionsProps> = ({ quote, isFavorite, onToggleFavorite }) => (
    <div className="mt-8 flex justify-center items-center gap-5">
        <button 
            onClick={() => onToggleFavorite(quote)} 
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} 
            className={`transition-all duration-200 transform hover:scale-110 ${isFavorite ? 'text-[#c5a572] hover:text-[#e0dace]' : 'text-[#a1968b]/80 hover:text-[#f5eeda]'}`}
        >
            <HeartIcon isFilled={isFavorite} />
        </button>
        <ShareButtons quote={quote} />
    </div>
);


interface SettingsMenuProps {
    onSurpriseMe: () => void;
    onClearQuote: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onSurpriseMe, onClearQuote }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAction = (action: () => void) => {
        action();
        setIsOpen(false);
    }

    return (
        <div ref={menuRef} className="relative z-50">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Open settings menu" className="p-2 rounded-full text-[#a1968b]/70 hover:text-[#f5eeda] hover:bg-white/5 transition-all duration-200">
                <SettingsIcon className="transform transition-transform duration-500 ease-in-out" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#2a2a2e] border border-[#b89b70]/40 rounded-md shadow-xl animate-fade-in origin-top-right">
                    <ul className="py-1 text-[#e0dace]">
                        <li>
                            <button onClick={() => handleAction(onSurpriseMe)} className="w-full text-left px-4 py-2 text-sm hover:bg-[#b89b70]/10 transition-colors duration-200">Surprise Me</button>
                        </li>
                        <li>
                            <button onClick={() => handleAction(onClearQuote)} className="w-full text-left px-4 py-2 text-sm hover:bg-[#b89b70]/10 transition-colors duration-200">Clear Quote</button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};


const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('the nature of reality');
  const [genre, setGenre] = useState<QuoteGenre>(QuoteGenre.PHILOSOPHICAL);
  const [generatedQuote, setGeneratedQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (quote: string) => {
    const isAlreadyFavorite = favorites.includes(quote);
    const newFavorites = isAlreadyFavorite
      ? favorites.filter(fav => fav !== quote)
      : [...favorites, quote];
    
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };
  
  const handleRemoveFavorite = (quote: string) => {
    const newFavorites = favorites.filter(fav => fav !== quote);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const handleGenerateQuote = useCallback(async (currentTopic: string, currentGenre: QuoteGenre) => {
    if (!currentTopic.trim()) {
      setError('Please provide a topic to inspire a quote.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedQuote(null);

    try {
      const quote = await generateQuote(currentTopic, currentGenre);
      setGeneratedQuote(quote);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSurpriseMe = useCallback(() => {
    const randomTopics = [
        'the vastness of space', 
        'the quiet of a library', 
        'the meaning of friendship', 
        'the passage of time', 
        'the courage of a single step',
        'the echo of a forgotten song',
        'the warmth of the morning sun'
    ];
    const genres = Object.values(QuoteGenre);

    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    
    setTopic(randomTopic);
    setGenre(randomGenre);
    handleGenerateQuote(randomTopic, randomGenre);
  }, [handleGenerateQuote]);

  const handleClearQuote = () => {
      setGeneratedQuote(null);
      setError(null);
      setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen text-[#e0dace] flex flex-col items-center p-4 selection:bg-[#c5a572] selection:text-[#1e1e22]">
      <header className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between">
          <button aria-label="Open profile" className="p-2 rounded-full text-[#a1968b]/70 hover:text-[#f5eeda] hover:bg-white/5 transition-all duration-200">
              <ProfileIcon />
          </button>
          <div className="flex items-center gap-2">
              <button onClick={() => setIsFavoritesOpen(true)} aria-label="Open favorites" className="p-2 rounded-full text-[#a1968b]/70 hover:text-[#f5eeda] hover:bg-white/5 transition-all duration-200">
                  <QuillIcon />
              </button>
              <SettingsMenu onSurpriseMe={handleSurpriseMe} onClearQuote={handleClearQuote} />
          </div>
      </header>

      <main className="max-w-3xl w-full flex-grow flex flex-col justify-center transition-all duration-300 text-center z-10 pt-16">
        <header>
          <h1 className="text-5xl sm:text-6xl font-serif-display font-medium tracking-wider text-[#f5eeda] text-glow animate-title-in">
            QuoteMuse
          </h1>
          <p className="mt-4 text-[#a1968b] text-shadow">
            An echo of the ineffable.
          </p>
        </header>

        <FlourishDivider className="my-8 animate-fade-in-up [animation-delay:200ms]" />

        <div className="mt-0 animate-fade-in-up [animation-delay:400ms]">
          <label htmlFor="topic" className="block text-sm font-medium text-[#a1968b] mb-2 text-shadow">
            Offer a subject for contemplation
          </label>
          <div className="relative w-full max-w-lg mx-auto">
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. existence, time, consciousness..."
              className="w-full px-6 py-3 pr-12 bg-transparent border border-[#b89b70]/40 rounded-full text-[#f5eeda] outline-none focus:ring-0 transition-all duration-300 placeholder:text-center placeholder-[#a1968b]/70 text-center text-lg focus:bg-[#1e1e22]/50 focus:animate-pulsing-glow"
            />
            <button 
                onClick={handleSurpriseMe} 
                aria-label="Generate a random quote" 
                className="group absolute top-1/2 right-4 -translate-y-1/2 text-[#a1968b]/70 hover:text-[#f5eeda] transition-colors duration-200"
            >
                <SparklesIcon className="group-hover:scale-110 transition-transform"/>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-[#2a2a2e] text-[#f5eeda] text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Surprise Me
                </span>
            </button>
          </div>
        </div>

        <div className="animate-fade-in-up [animation-delay:600ms]">
            <GenreSelector selectedGenre={genre} onSelectGenre={setGenre} />
        </div>
        
        <div className="animate-fade-in-up [animation-delay:800ms]">
            <button
              onClick={() => handleGenerateQuote(topic, genre)}
              disabled={isLoading}
              className="px-8 py-3 my-4 text-base font-semibold rounded-full bg-[#b89b70] text-[#1e1e22] hover:bg-[#c5a572] transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-black/25 transform hover:-translate-y-1 hover:scale-105 disabled:transform-none"
            >
              {isLoading ? 'Pondering...' : 'Generate Quote'}
            </button>
        </div>
        
        <SubtleDivider className="my-6 animate-fade-in-up [animation-delay:1000ms]" />
        
        <div className="mt-4 min-h-[250px] flex flex-col items-center justify-center animate-fade-in-up [animation-delay:1200ms]">
            {isLoading && <Loader />}
            {error && <p className="text-red-400/90 text-center text-shadow">{error}</p>}
            {generatedQuote && (
                <>
                    <QuoteDisplay quote={generatedQuote} />
                    <QuoteActions
                        quote={generatedQuote}
                        isFavorite={favorites.includes(generatedQuote)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                </>
            )}
        </div>

      </main>
      
      <div className="w-full max-w-3xl text-center animate-fade-in [animation-delay:1400ms]">
        <FlourishDivider />
        <footer className="pt-8 pb-4">
            <p className="text-sm text-[#a1968b]/80 max-w-md mx-auto text-shadow">
              QuoteMuse is a digital sanctuary for wordsmiths and thinkers, crafting unique, elegant quotes with the help of Gemini's generative power. Explore the nuances of language and discover inspiration, one thought at a time.
            </p>
            <p className="mt-4 text-xs text-[#a1968b]/60">
                Made by <a href="https://github.com/vibhu-weeboo" target="_blank" rel="noopener noreferrer" className="hover:text-[#b89b70] underline transition-colors">vibhu-weeboo</a>
            </p>
        </footer>
      </div>

      <FavoritesPanel 
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
};

export default App;
