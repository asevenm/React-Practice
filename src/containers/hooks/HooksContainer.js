import React, { useState } from 'react';
import { ThemeContext, LocaleContext, languages, themes } from './context';
import InputName from '../../components/hooks/InputName';

const HooksContaienr = () => {
  const [theme, setTheme] = useState(themes.yellow);
  const [language, setLanguage] = useState(languages.chinese);

  return (
    <ThemeContext.Provider value={theme}>
      <LocaleContext.Provider value={language}>
        <h1>this is the hook feature demo. </h1>
        <InputName />
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default HooksContaienr;