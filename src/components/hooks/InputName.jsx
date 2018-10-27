import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext, LocaleContext } from '../../containers/hooks/context';
import Row from './Row';
import './InputName.scss';

const useInputChange = (initValue) => {
  const [value, setValue] = useState(initValue)
  const handleValueChange = (event) => {
    setValue(event.target.value);
  }
  return {
    value,
    onChange: handleValueChange,
  };
};

const InputName = () => {
  const theme = useContext(ThemeContext);
  const language = useContext(LocaleContext);
  const [width, setWidth] = useState(window.innerWidth);
  const name = useInputChange('aseven');
  const location = useInputChange('shanghai');

  const handleWidthChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    document.title = `Hello, ${name.value}`;
  });

  useEffect(() => {
    window.addEventListener('resize', handleWidthChange);
    return () => {
      window.removeEventListener('resize', handleWidthChange);
    }
  });

  return (
    <div className={theme}>
      <Row label="userName">
        <input {...name} /> 
      </Row>
      <Row label="location">
        <input {...location} /> 
      </Row>
      <Row label="locale">
        {language} 
      </Row>
      <Row label="width">
        {width} 
      </Row>
    </div>
  );
}

export default React.memo(InputName);