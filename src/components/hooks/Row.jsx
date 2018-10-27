import React from 'react';
import './Row.scss';

export default React.memo((props) => (
  <div className="row">
    <div className="label">
      <i /> 
      <span>{props.label}</span>
      <i />
    </div>
    {props.children}
  </div>
));