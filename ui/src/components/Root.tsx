/* eslint-disable react/prop-types */
import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import { motion } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNuiEvent } from '../hooks/useNuiEvent.ts';
import { debugData } from '../utils/debugData.ts';
import { fetchNui } from '../utils/fetchNui.ts';
import { useExitListener } from '../hooks/useExitListener.ts';
import CardWrapper from './Card';
import '@fontsource/plus-jakarta-sans';
import {
  errorState,
  notificationState,
  openState,
  secondMenu,
  shouldMenuBeOpen,
} from './state';
import SecondCard from './SecondCard';
import NotificationCard from './Notifications/NotificationCard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Container = styled(Card)`
  margin: 40px;

  background: #3e3e3e;
  color: white;
  border-radius: 12px !important;
  overflow: initial !important;

  width: 540px;

  height: calc(100% - 80px);
  //height: 100%;
`;

const Huutista = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100vh;
`;

const SecondContainer = styled.div`
  height: 100vh;
`;

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

const ReturnClientDataComp = ({ data }) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(data, null)}</code>
    </pre>
  </>
);

const variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 1000 },
};

const secondVariants = {
  visible: {
    opacity: 1,
    x: -80,
    zIndex: 123,
    height: '100%',
  },
  hidden: {
    opacity: 0,
    x: 100,
    zIndex: 0,
    height: '100%',
    pointerEvents: 'none',
  },
};

const NotificationVariants = {
  visible: {
    opacity: 1,
    x: 0,
    zIndex: 123,
    height: '100%',
  },
  hidden: {
    opacity: 0,
    x: 100,
    zIndex: 0,
    height: '100%',
    pointerEvents: 'none',
  },
};

const Root = () => {
  const [clientData, setClientData] = useState(null);
  const [objectName, setObjectName] = useState('apa_mp_h_yacht_strip_chair_01');
  const [isOpen, setOpen] = useRecoilState(openState);
  const [isSecondOpen, setSecondOpen] = useRecoilState(shouldMenuBeOpen);
  const [notif, setNotif] = useRecoilState(notificationState);

  useNuiEvent('setVisible', (data) => {
    // This is our handler for the setVisible action.
    console.log('setvisible', data);
    setOpen(data);
  });

  useNuiEvent('camData', (data) => {
    // This is our handler for the setVisible action.
    // console.log('camData', data);
  });

  useExitListener(setOpen);

  const handleGetClientData = async () => {
    const retData = await fetchNui('getClientData');
    console.log('Got return data from client scripts:');
    console.dir(retData);
    setClientData(retData);
  };

  const createObject = async () => {
    const retData = await fetchNui('createObject', { object: objectName });
    console.log('Done objecti', retData);
  };

  const getObject = async () => {
    const retData = await fetchNui('getObject');
    // console.log('Done ', retData);
    const resData = await fetchNui('getObjectData', retData);
    console.log('Done ', resData);
  };

  // useEffect(() => {
  //   const keyHandler = (e) => {
  //     // console.log(e.code);
  //     if (e.code === 'KeyE') {
  //       getObject();
  //     }
  //   };
  //
  //   window.addEventListener('keydown', keyHandler);
  //
  //   return () => window.removeEventListener('keydown', keyHandler);
  // }, []);

  function closeSecondMenu() {
    if (isSecondOpen.open) {
      setSecondOpen(false);
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <motion.div
        variants={variants}
        initial={{ x: 1000 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        animate={isOpen ? 'visible' : 'hidden'}
      >
        <Huutista>
          {/* NOTIF */}

          <SecondContainer style={{ height: 'auto' }}>
            <motion.div
              variants={NotificationVariants}
              initial={{ x: 1000, zIndex: '0' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              animate={notif[0] ? 'visible' : 'hidden'}
            >
              <Container
                style={{ height: 'auto', width: '380px' }}
                elevation={14}
                sx={{ borderRadius: '12px', marginRight: '0px' }}
              >
                <NotificationCard />
              </Container>
            </motion.div>
          </SecondContainer>

          {/* SECOND CARD */}
          <SecondContainer>
            <motion.div
              style={{ position: 'fixed', transform: 'translate(-80px, 0px)' }}
              variants={secondVariants}
              initial={{ x: 1000, zIndex: '0' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              animate={isSecondOpen.open ? 'visible' : 'hidden'}
            >
              <Container
                // style={{ transform: 'translate(-80px, 0px)' }}
                elevation={14}
                sx={{ borderRadius: '12px', marginRight: '0px' }}
              >
                <SecondCard />
              </Container>
            </motion.div>
          </SecondContainer>

          <Container
            onClick={closeSecondMenu}
            elevation={4}
            sx={{ borderRadius: '12px' }}
          >
            <CardWrapper />
          </Container>
        </Huutista>
      </motion.div>
    </ThemeProvider>
  );
};

export default Root;
