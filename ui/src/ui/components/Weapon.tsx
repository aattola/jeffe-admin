import React, { useEffect, useState } from 'react';

import {
  FormControl, IconButton, InputLabel, ListSubheader,
  MenuItem, Select, SelectChangeEvent, TextField, Typography,
} from '@mui/material';

import styled from 'styled-components';
import { observer } from 'mobx-react';
import menuState from './state/MenuState';
import { Weapons } from './ObjectConstants';
import Loader from './Loader';
import { fetchNui } from '../utils/fetchNui';

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

const Subheader = styled(ListSubheader)`
  && {
    line-height: 30px;
    height: 30px;
    padding-left: 10px;
    background: #3a3a3a;
    text-transform: capitalize;
  }
`;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 10 + 8,
      width: 250,
    },
  },
};

function Weapon() {
  const [weapon, setWeapon] = useState('');
  const [loading, setLoading] = useState(false);
  const [bullets, setBullets] = useState('24');

  const handleChange = (event: SelectChangeEvent) => {
    setWeapon(event.target.value);
  };

  const handleSpawn = async () => {
    if (!weapon) return;
    setLoading(true);
    await fetchNui('giveWeapon', { weaponHash: weapon, bullets })
      .catch((err) => setLoading(false));
    setLoading(false);
  };

  const removeWeapons = async () => {
    await fetchNui('removeWeapons')
      .catch((err) => console.log(err));
  };

  return (
    <>

      <h1>mo</h1>

      <FormControl fullWidth>
        <InputLabel htmlFor="weapon-select">Weapon</InputLabel>
        <Select value={weapon} onChange={handleChange} MenuProps={MenuProps} defaultValue="" id="weapon-select" label="Weapon">
          {Weapons.map((weaponCategory) => {
            const items = weaponCategory.keys.map((item) => (
              <MenuItem value={item.keys}>{item.type}</MenuItem>
            ));

            return [
              <Subheader>{weaponCategory.type}</Subheader>,
              items,
            ];
          })}
        </Select>
      </FormControl>

      <Grid>
        <button
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
          onClick={() => handleSpawn()}
          type="button"
          className="block red"
        >
          {loading && <Loader size={15} />}
          Give
        </button>

        <TextField
          value={bullets}
          onChange={(e) => setBullets((e.target.value))}
          label="Bullets"
          size="small"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <button
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
        onClick={() => removeWeapons()}
        type="button"
        className="block red"
      >
        Remove weapons
      </button>
    </>
  );
}

export default Weapon;
