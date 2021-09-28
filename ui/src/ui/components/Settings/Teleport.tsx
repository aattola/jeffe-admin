import React, { useMemo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import {
  Checkbox, FormControlLabel, FormGroup, Typography,
} from '@mui/material';
import { fetchNui } from '../../utils/fetchNui';
import CustomSelect from '../CustomSelect';
import { Teleports } from '../ObjectConstants';
import menuState from '../state/MenuState';
import asyncWrapper from '../../utils/asyncWrapper';

const Container = styled.div`
  
`;

const SelectGrid = styled.div`
  display: flex;
  gap: 20px;
  margin: 5px 0;
`;

function TeleportSettings() {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState('');

  async function handleClick() {
    const data = await fetchNui('toggleNoclip');
    console.log('togglettu', data.noclip);
  }

  function handleValue(e: any) {
    console.log(e);
    setValue(e);
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }

  async function handleTeleport() {
    const [data, error] = await asyncWrapper(fetchNui('teleportPlayer', { safeTp: checked, to: value }));
    console.log(data, error);
  }

  const players = useMemo(() => menuState.players.map((player) => ({
    label: player.name,
    value: player.id,
  })), [menuState.players]);

  const ToTeleports = [
    {
      label: 'Me',
      value: menuState.self?.id,
    },
    {
      label: 'Waypoint',
      value: 'waypoint',
    },
    {
      label: 'Players:',
      subheader: true,
      value: 0,
    },
    ...players,
    {
      label: 'Locations:',
      subheader: true,
      value: 0,
    },
    ...Teleports,
  ];

  const WhoPlayers = [
    {
      label: 'Me',
      value: menuState.self?.id,
    },
    {
      label: 'Players:',
      subheader: true,
      value: 'QuintillionareGrindset',
    },
    ...players,
  ];

  return (
    <Container>
      <Typography>Teleport:</Typography>

      <SelectGrid>
        <CustomSelect
          items={WhoPlayers}
          setValue={handleValue}
          label="Who"
        />

        <CustomSelect
          items={ToTeleports}
          setValue={handleValue}
          label="To"
        />
      </SelectGrid>

      {value !== 'waypoint' && (
        <FormGroup style={{ marginTop: 5 }}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckbox} />}
            label="Safe teleport"
          />
        </FormGroup>
      )}

      <button
        onClick={handleTeleport}
        type="button"
        className="block red"
      >
        Teleport
      </button>

    </Container>
  );
}

export default observer(TeleportSettings);
