import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FormControl, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { fetchNui } from '../../utils/fetchNui';
import PlayerPicker from '../PlayerPicker';
import menuState from '../state/MenuState';

const Container = styled.div`
`;

function KickSettings() {
  const [reason, setReason] = useState('');

  async function handleClick() {
    toast.promise(
      fetchNui('kickPlayer', { reason }),
      {
        loading: 'Kicking',
        success: 'Kicked',
        error: (err2) => `${err2.error.toString()}`,
      },
    );

    await menuState.fetchPlayers();
  }

  return (
    <Container>

      <PlayerPicker defaultExpanded />

      <FormControl fullWidth>
        <TextField
          style={{ marginTop: 10, marginBottom: 10 }}
          value={reason}
          onChange={(e) => setReason((e.target.value))}
          label="Reason"
          required
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <button
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
        onClick={handleClick}
        type="button"
        className="block red"
      >
        Kick target
      </button>

    </Container>
  );
}

export default observer(KickSettings);
