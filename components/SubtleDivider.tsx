import React from 'react';

const SubtleDivider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <svg width="150" height="30" viewBox="0 0 150 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 15H65" stroke="#a1968b" strokeWidth="1" strokeOpacity="0.4"/>
      <path d="M85 15H150" stroke="#a1968b" strokeWidth="1" strokeOpacity="0.4"/>
      <path d="M75 13L77 15L75 17L73 15L75 13Z" stroke="#a1968b" strokeWidth="1" strokeOpacity="0.4" fill="#a1968b" fillOpacity="0.2"/>
    </svg>
  </div>
);

export default SubtleDivider;
