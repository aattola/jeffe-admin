import React from 'react';
import {
  Typography,
  TextField,
  Autocomplete,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import styled from 'styled-components';
import { CarConstants } from './ObjectConstants';
import { fetchNui } from '../utils/fetchNui';
import Loader from './Loader';
import ColourPicker from './ColorPicker';
import { CarPayload } from '../../../../shared/types';

const ComponentWrapper = styled.div`
  margin: 15px 0;
`;

type varitType = CarPayload['varit'];

const varit: varitType | [] = [];

function Car() {
  const initLoadData = {
    type: '',
  };
  const [loading, setLoading] = React.useState(initLoadData);
  const [car, setCar] = React.useState<string>('');
  const [checked, setChecked] = React.useState(false);

  function handleChange(
    e: React.SyntheticEvent,
    v: React.SetStateAction<string> | null,
    reason: string,
  ) {
    if (e.type === 'keydown' && reason === 'removeOption') {
      return;
    }
    if (v === null) setCar('');
    else setCar(v);
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }

  const handleSave = async (data: any | CarPayload) => {
    if (!data) return console.log('unohit handleSaven datan');
    if (data.type === 'spawn') {
      // eslint-disable-next-line no-param-reassign
      data = { ...data, varit, safeSpawn: checked };
    }
    setLoading(data);
    const retData = await fetchNui('car', data).catch((err) => {
      setLoading(initLoadData);
      // setNotif([
      //   {
      //     title: 'Errori',
      //     desc: 'Virhe tapahtu autossa',
      //     components: [],
      //   },
      // ]);
      console.log('ERRORI', err);
    });
    console.log(retData, 'retDataa');
    if (!retData || !retData.ok) {
      // setNotif([
      //   {
      //     title: 'Errori',
      //     desc: retData
      //       ? retData.error
      //       : 'Varmaan devvaat selaimesta kun ei vastausta tule',
      //     components: [],
      //   },
      // ]);
      console.log('ERRORI', retData);
    }
    return setLoading(initLoadData);
  };

  const handleColor = (data: any, pos: 'Primary' | 'Secondary') => {
    if (data) {
      if (pos === 'Primary') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // @ts-ignore
        varit[0] = data;
        return;
      }

      // @ts-ignore
      varit[1] = data;
    }
  };

  return (
    <>
      <ComponentWrapper>
        <Typography>Spawning:</Typography>

        <Autocomplete
          style={{ marginTop: 5 }}
          disablePortal
          freeSolo
          value={car}
          onChange={handleChange}
          options={CarConstants}
          autoComplete
          renderInput={(params) => <TextField {...params} label="Vehicle" />}
        />

        <ColourPicker getColor={handleColor} type="Primary" />
        <ColourPicker getColor={handleColor} type="Secondary" />

        {/* <Grid> */}
        <div style={{ display: 'flex' }}>
          <button
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              margin: 0,
              marginTop: 10,
            }}
            onClick={() => handleSave({ type: 'spawn', model: car })}
            type="button"
            className="block red"
          >
            {loading.type === 'spawn' && <Loader size={15} />}
            Spawn
          </button>

          <button
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginTop: 10,
              marginLeft: 5,
            }}
            onClick={() => handleSave({ type: 'seat', vehicle: 'last' })}
            type="button"
            className="btn block inverted"
          >
            {loading.type === 'seat' && <Loader size={15} />}
            Seat
          </button>

          <button
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginTop: 10,
              marginLeft: 5,
            }}
            onClick={() => handleSave({ type: 'delete', vehicle: 'last' })}
            type="button"
            className="btn block inverted"
          >
            {loading.type === 'delete' && <Loader size={15} />}
            Delete
          </button>
        </div>

        <FormGroup style={{ marginTop: 5 }}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckbox} />}
            label="Safe spawn"
          />
        </FormGroup>

        {/*  <TextInput value={car} onChange={(e) => setCar(e.target.value)} /> */}
        {/* </Grid> */}
      </ComponentWrapper>

      <Divider variant="middle" style={{ margin: '20px 0px' }} />

      <ComponentWrapper>
        <Typography>Fix current vehicle:</Typography>

        <button
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
          onClick={() => handleSave({ type: 'fix' })}
          type="button"
          className="block red"
        >
          {loading.type === 'fix' && <Loader size={15} />}
          Fix
        </button>
      </ComponentWrapper>

      <Divider variant="middle" style={{ margin: '20px 0px' }} />

      <ComponentWrapper>
        <Typography>Clean current vehicle:</Typography>

        <button
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
          onClick={() => handleSave({ type: 'clean' })}
          type="button"
          className="block red"
        >
          {loading.type === 'clean' && <Loader size={15} />}
          Clean
        </button>
      </ComponentWrapper>
    </>
  );
}

export default Car;
