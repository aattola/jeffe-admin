/* eslint-disable no-console */
import React, { useState } from 'react';

import {
  FormControl, InputLabel, ListSubheader,
  MenuItem, Select, SelectChangeEvent, TextField,
} from '@mui/material';

import styled from 'styled-components';
import { Weapons } from '../ObjectConstants';
import Loader from '../Loader';
import { fetchNui } from '../../utils/fetchNui';

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
      .catch(() => setLoading(false));
    setLoading(false);
  };

  const removeWeapons = async () => {
    await fetchNui('removeWeapons')
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* <Typography>Weapo</Typography> */}

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
        <TextField
          style={{ marginTop: 10, marginBottom: 10 }}
          value={bullets}
          onChange={(e) => setBullets((e.target.value))}
          label="Bullets"
        // size="small"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <button
        style={{ marginRight: 5 }}
        onClick={() => handleSpawn()}
        type="button"
        className="block red"
      >
        {loading && <Loader size={15} />}
        Give
      </button>
      {/* <Grid> */}

      {/* </Grid> */}

      <button
        onClick={() => removeWeapons()}
        type="button"
        className="btn block inverted"
      >
        Remove weapons
      </button>
    </>
  );
}

export default Weapon;
