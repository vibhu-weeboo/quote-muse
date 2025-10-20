import React, { useState, useEffect } from 'react';

interface QuoteDisplayProps {
  quote: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote }) => {
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Reset state for a new quote
    setDisplayedQuote('');
    setIsTyping(true);

    const typingSpeed = 50; // ms per character
    let index = 0;

    const timer = setInterval(() => {
      if (index < quote.length) {
        setDisplayedQuote(quote.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(timer); // Cleanup on unmount or if quote changes
  }, [quote]);

  return (
    <div className="mt-8 w-full max-w-4xl text-center">
      <blockquote className="relative p-6">
        <p className="text-4xl md:text-6xl font-serif-display italic text-[#f5eeda] leading-relaxed md:leading-loose text-glow min-h-[150px] flex justify-center items-center">
          <span className="relative">
            &ldquo;{displayedQuote}
            {isTyping && (
              // This is a blinking cursor that disappears when typing is done
              <span className="inline-block w-1 h-10 md:h-12 bg-[#c5a572]/80 ml-2 animate-pulse-fast align-middle"></span>
            )}
            &rdquo;
          </span>
        </p>
      </blockquote>
    </div>
  );
};

export default QuoteDisplay;
