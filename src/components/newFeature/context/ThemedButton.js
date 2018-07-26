import React from 'react';
import {ThemeContext} from './themeContext';

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button
          {...props}
          style={{backgroundColor: theme.background}}
        />

      )}
    </ThemeContext.Consumer>
  );
}

export default ThemedButton;