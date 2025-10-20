import React from 'react';

const FlourishDivider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <svg width="250" height="30" viewBox="0 0 250 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 15H100" stroke="#a1968b" strokeWidth="1" strokeOpacity="0.4"/>
      <path d="M150 15H250" stroke="#a1968b" strokeWidth="1" strokeOpacity="0.4"/>
      <path d="M115 15C115 11.6863 117.686 9 121 9C124.314 9 127 11.6863 127 15C127 18.3137 124.314 21 121 21C117.686 21 115 18.3137 115 15ZM121 21C122.591 21 123.982 20.2193 125 19M121 9C122.591 9 123.982 9.78071 125 11M135 15C135 11.6863 132.314 9 129 9C125.686 9 123 11.6863 123 15C123 18.3137 125.686 21 129 21C132.314 21 135 18.3137 135 15ZM129 21C127.409 21 126.018 20.2193 125 19M129 9C127.409 9 126.018 9.78071 125 11M100 15L108 7.5M100 15L108 22.5M150 15L142 7.5M150 15L142 22.5" stroke="#a1968b" strokeWidth="1" strokeOpacity="0.4"/>
    </svg>
  </div>
);

export default FlourishDivider;