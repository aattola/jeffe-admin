import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';
import ErrorBoundary from '../ErrorBoundary';
import { notificationState } from '../state';

const Topbar = styled.div`
  //border: 1px solid rgb(251 251 251 / 15%);
  padding: 10px 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div``;

const SettingsContainer = styled.div`
  padding: 15px 20px;
`;

const Text = styled.h1`
  font-family: Rubik; //'Plus Jakarta Sans'
  margin: 0px;
  font-size: 18px;
`;

const SettingsGrid = styled.div`
  grid-template-rows: 1fr;
  grid-gap: 10px;
  display: grid;
`;

function NotificationCard() {
  const [notif, setNotif] = useRecoilState(notificationState);

  return (
    <Container>
      <Topbar>
        <Text>Notification</Text>

        <IconButton onClick={() => setNotif([])}>
          <CloseIcon />
        </IconButton>
      </Topbar>

      <Divider />

      <div style={{ height: 'auto' }}>
        <SettingsContainer>
          <ErrorBoundary>
            {notif.map((Notification: any, i: number) => (
              <div key={i}>
                <h3 style={{ margin: '5px 0px' }}>{Notification.title}</h3>
                <p>{Notification.desc}</p>
                {Notification.components.map((Component: any, i2: number) => (
                  <Component key={i2} />
                ))}
              </div>
            ))}
          </ErrorBoundary>
        </SettingsContainer>
      </div>
    </Container>
  );
}

export default NotificationCard;
