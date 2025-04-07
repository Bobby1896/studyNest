import React from 'react';

const FirstLetters = ({ 
  name, 
  className = '', 
  style = {},
  skipWords = ['and', '&'] // Words to skip (case insensitive)
}) => {
  if (!name) return null;

  // Split, trim, filter empty words, and convert to lowercase for comparison
  const words = name
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .filter(word => !skipWords.includes(word.toLowerCase()));

  // Get the first letters (uppercase)
  let initials = '';
  if (words.length >= 2) {
    initials = `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  } else if (words.length === 1) {
    initials = words[0][0].toUpperCase();
  }
  
  return (
    <span className={className} style={style}>
      {initials}
    </span>
  );
};

export default FirstLetters;