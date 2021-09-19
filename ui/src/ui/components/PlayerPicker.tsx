import React, { useEffect, useState } from 'react';

import {
  FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import styled from 'styled-components';
import { observer } from 'mobx-react';
import menuState from './state/MenuState';

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

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

function PlayerPicker() {
  const [p, setP] = useState('');
  useEffect(() => {
    menuState.getPlayers();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const [target] = menuState.players.filter((a) => a.guid === event.target.value);
    menuState.target = target;
    setP(event.target.value);
  };

  return (
    <>

      <div style={{ display: 'flex', gap: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="player-select">Player</InputLabel>
          <Select
            labelId="player-select"
            value={p}
            label="Player"
            MenuProps={MenuProps}
            onChange={handleChange}
          >
            {menuState.players.map((player) => (
              <MenuItem value={player.guid} key={player.guid}>
                {player.id}
                {' '}
                -
                {' '}
                {player.name}
              </MenuItem>
            ))}

          </Select>
        </FormControl>
        <IconButton onClick={() => menuState.getPlayers()} size="small" sx={{ width: 56 }} aria-label="refresh">
          <RefreshIcon />
        </IconButton>
      </div>

      <Grid>
        {menuState.target && (
          <>
            <span>
              ID:
              {menuState.target.id}
            </span>
            <span>
              Steam:
              {menuState.target.identifiers.steam}
            </span>
            <span>
              IP:
              {menuState.target.identifiers.ip}
            </span>
            <span>
              Guid:
              {menuState.target.guid}
            </span>
          </>
        )}
      </Grid>
    </>
  );
}

export default observer(PlayerPicker);
