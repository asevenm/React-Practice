import React from 'react';

export const themes = {
  yellow: 'yellow',
  blue: 'blue'
};

export const languages = {
  chinese: 'chinese',
  english: 'english',
};

export const ThemeContext = React.createContext(themes.yellow);

export const LocaleContext = React.createContext(languages.chinese);