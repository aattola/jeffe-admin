import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { fetchNui } from '../utils/fetchNui';
import Loader from './Loader';
import { BootstrapInput } from './CustomInput';
import { errorState } from './state';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

function Weather() {
  const weatherOptions = [
    'ExtraSunny',
    'Clear',
    'Clouds',
    'Smog',
    'Foggy',
    'Overcast',
    'Raining',
    'ThunderStorm',
    'Clearing',
    'Neutral',
    'Snowing',
    'Blizzard',
    'Snowlight',
    'Christmas',
    'Halloween',
  ];

  const [weather, setWeather] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useRecoilState(errorState);

  const handleChange = (event) => {
    setWeather(event.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    const retData = await fetchNui('setWeather', { weather }).catch((err) => {
      setError(true);
      setLoading(false);
    });
    console.log(retData, 'retDataa');
    setLoading(false);
  };

  return (
    <>
      <Typography>Weather:</Typography>
      <FormControl fullWidth>
        {/* <InputLabel id="w">Weather</InputLabel> */}
        <Select
          variant="outlined"
          // labelId="w"
          value={weather}
          label="Weather"
          onChange={handleChange}
          MenuProps={MenuProps}
          input={<BootstrapInput />}
        >
          {weatherOptions.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button
        style={{
          margin: '10px 0px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
        onClick={handleSave}
        type="button"
        className="block red"
      >
        {loading && <Loader size={15} />}
        Save
      </button>
    </>
  );
}

export default Weather;
