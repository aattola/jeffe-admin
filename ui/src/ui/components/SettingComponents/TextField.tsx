import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ButtonComponent } from './Settings';
import Loader from '../Loader';

function TextFieldComponent(
  { data, handleComponentState, componentState }:
    {data: ButtonComponent, handleComponentState: (cb: any, id: string) => void; componentState: any},
) {
  const [value, setValue] = useState('');

  function handleChange(e: any) {
    setValue(e.target.value);
    handleComponentState({ value: e.target.value }, data.id);
  }

  console.log(componentState, 'comp state');
  return (
    <div>
      {data.text && (
        <Typography>{data.text}</Typography>
      )}
      <input
        key={data.id}
        value={value}
        // value={componentState?.value}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextFieldComponent;
