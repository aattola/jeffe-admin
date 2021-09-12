import React from 'react';

import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TextField from '@mui/material/TextField';
import ClockIcon from '@mui/icons-material/AccessTime';

import { Typography, Box } from '@mui/material';

import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { fetchNui } from '../utils/fetchNui';
import Loader from './Loader';
import { errorState } from './state';

const TimeButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 2px solid #fffff0;
  //grid-gap: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 10px;
`;

function Time() {
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const [value, setValue] = React.useState(new Date('2021-01-01T24:00'));
  const states = ['Morning', 'Day', 'Evening', 'Night'];
  const [error, setError] = useRecoilState(errorState);

  const handleClick = (name: React.SetStateAction<string>) => {
    if (name === selected) return setSelected('');
    let time = value;
    if (name === 'Morning') {
      time = new Date('2021-01-01T06:00');
    }
    if (name === 'Day') {
      time = new Date('2021-01-01T12:00');
    }

    if (name === 'Evening') {
      time = new Date('2021-01-01T18:00');
    }

    if (name === 'Night') {
      time = new Date('2021-01-01T24:00');
    }

    setValue(time);
    setSelected(name);
  };

  const handleSave = async () => {
    setLoading(true);
    const retData = await fetchNui('setTime', {
      time: value,
    }).catch((err) => {
      setError(true);
    });
    console.log(retData, 'retDataa');
    setLoading(false);
  };

  return (
    <>
      <Typography>Time:</Typography>

      <TimeButtons>
        {states.map((name) => (
          <button
            key={name}
            onClick={() => handleClick(name)}
            type="button"
            style={{ border: '0px solid', borderRight: '0px solid' }}
            className={
              selected === name
                ? 'btn block inverted selected'
                : 'btn block inverted'
            }
          >
            {name}
          </button>
        ))}
      </TimeButtons>

      <Grid>
        <button
          style={{
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            hideTabs
            showTodayButton
            todayText="now"
            openTo="hours"
            shouldDisableYear={() => true}
            value={value}
            onChange={(newValue) => {
              setSelected('');
              if (newValue == null) return;
              setValue(newValue);
            }}
            minDate={new Date('2018-01-01')}
            components={{
              LeftArrowIcon: AlarmIcon,
              RightArrowIcon: SnoozeIcon,
              OpenPickerIcon: ClockIcon,
            }}
            leftArrowButtonText="Open previous month"
            rightArrowButtonText="Open next month"
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* @ts-ignore */}
                <TextField
                  variant="outlined"
                  size="small"
                  ref={inputRef}
                  {...inputProps}
                />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
}

export default Time;
