import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';
import ErrorBoundary from './ErrorBoundary';
import { shouldMenuBeOpen } from './state';

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
  const [openState, setOpen] = useRecoilState<any | any>(shouldMenuBeOpen);

  // console.log('OPEN STATE', openState);

  return (
    <Container>
      <Topbar>
        <Text>
          {' '}
          {openState?.title || 'Unohdit openState.titlen'}
        </Text>

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
