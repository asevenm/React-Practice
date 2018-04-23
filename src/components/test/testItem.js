import React from 'react';

export default ({ checked, name }) => (
    <div>
        <input type="checkbox" checked={checked}/> 
        <span>{name}</span>
    </div>
)