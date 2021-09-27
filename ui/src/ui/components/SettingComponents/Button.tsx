import React from 'react';
import { Typography } from '@mui/material';
import { ButtonComponent } from './Settings';
import Loader from '../Loader';

function Button(
  { data, clickHandler, handleComponentState }:
    {data: ButtonComponent, clickHandler: (cb: ButtonComponent) => void, handleComponentState: (cb: ButtonComponent) => void},
) {
  return (
    <div>
      {data.text && (
        <Typography>{data.text}</Typography>
      )}
      <button
        type="button"
        className={data.variant === 'red' ? 'block red' : 'btn block inverted'}
        onClick={() => clickHandler(data)}
      >
        {data.buttonText}
      </button>
    </div>
  );
}

export default Button;
