import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorBoundary from './ErrorBoundary';

const Topbar = styled.div`
  //border: 1px solid rgb(251 251 251 / 15%);
  padding: 15px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  height: 100vh;
`;

const SettingsContainer = styled.div`
  padding: 15px 20px;
`;

const Text = styled.h1`
  margin: 0;
  font-size: 20px;
`;

function CardWrapper() {
  // console.log('OPEN STATE', openState);

  return (
    <Container>
      <Topbar>
        <Text>
          {' '}
        </Text>

        <IconButton onClick={() => null}>
          <CloseIcon />
        </IconButton>
      </Topbar>

      <Divider />

    </Container>
  );
}

export default CardWrapper;
