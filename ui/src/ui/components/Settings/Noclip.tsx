import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { fetchNui } from '../../utils/fetchNui';
import asyncWrapper from '../../utils/asyncWrapper';

const Container = styled.div`
  margin-top: 7px;
`;

function NoclipSettings() {
  async function handleClick() {
    const [, error] = await asyncWrapper(fetchNui('toggleNoclip'));
    if (error) {
      toast.error('Noclip Error!');
      throw new Error(`Noclip kusi ${JSON.stringify(error)}`);
    }
  }

  return (
    <Container>

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
