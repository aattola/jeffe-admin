import React, { useState } from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useRecoilValue } from 'recoil';
import Weather from './Weather';
import { fetchNui } from '../utils/fetchNui';
import Time from './Time';
import ErrorBoundary from './ErrorBoundary';
import Car from './Car';
import { errorState, secondMenu, shouldMenuBeOpen } from './state';

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
  font-family: Rubik; //'Plus Jakarta Sans'
  margin: 0px;
  font-size: 20px;
`;

const SettingsGrid = styled.div`
  grid-template-rows: 1fr;
  grid-gap: 10px;
  display: grid;
`;

function CardWrapper() {
  const settingMenus = ['Pelaaja', 'Autot', 'Sää'];
  const [selected, setSelected] = useState('');
  const [openState, setOpen] = useRecoilState<any | any>(shouldMenuBeOpen);

  console.log('OPEN STATE', openState);

  return (
    <Container>
      <Topbar>
        <Text>{openState?.title || 'Unohdit openState.titlen'}</Text>

        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Topbar>

      <Divider />

      <div style={{ height: 'calc(100% - 70px)' }}>
        <SettingsContainer>
          <ErrorBoundary>
            {(openState.components || []).map((Component: any, i: number) => (
              <span key={i}>
                <Component />
              </span>
            ))}
          </ErrorBoundary>
        </SettingsContainer>
      </div>
    </Container>
  );
}

export default CardWrapper;
