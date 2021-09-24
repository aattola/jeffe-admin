import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Typography } from '@mui/material';
import { fetchNui } from '../../utils/fetchNui';

const Container = styled.div`
  
`;

function NoclipSettings() {
  async function handleClick() {
    const data = await fetchNui('toggleNoclip');
    console.log('togglettu', data.noclip);
  }

  return (
    <Container>
      <Typography>Noclip:</Typography>

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
        Toggle
      </button>

    </Container>
  );
}

export default observer(NoclipSettings);
