import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-[#c5a572] rounded-full animate-pulse-fast"></div>
        <div className="w-2 h-2 bg-[#c5a572] rounded-full animate-pulse-fast [animation-delay:0.2s]"></div>
        <div className="w-2 h-2 bg-[#c5a572] rounded-full animate-pulse-fast [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};

export default Loader;