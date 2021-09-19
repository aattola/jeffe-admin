/* eslint-disable react/prop-types */
// import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import './Styles/App.css';
import './Styles/ColorPicker.css';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { observer } from 'mobx-react';

import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';
import { useExitListener } from '../hooks/useExitListener';
import CardWrapper from './Card';
import {
  debug as debugState,
  notificationState,
  shouldMenuBeOpen,
} from './state';
import SecondCard from './SecondCard';
import NotificationCard from './Notifications/NotificationCard';
import openState from './state/OpenState';
import Noclip from './Noclip';

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
  /* //height: 100%; */
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
    data: false,
  },
]);

debugData([
  {
    action: 'setNoclip',
    data: { noclip: true, speed: 2 },
  },
]);

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

function DebugComponent(props: { isOpen: boolean; deb: any; setOpen: (o: boolean) => void }) {
  const { isOpen, setOpen, deb } = props;
  return (
    <Container
      style={{
        border: '2px solid black',
        borderRadius: 8,
        padding: 15,
        position: 'absolute',
        color: 'black',
        background: 'white',
      }}
    >
      <p>Debug nappeja</p>
      <button
        type="button"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        toggle open
      </button>

      <div style={{ overflowY: 'scroll', height: 'calc(100% - 70px)' }}>
        {deb.map((debugThing: any, i: number) => {
          console.log(debugThing);
          if (debugThing.error) {
            return (
              <div
                style={{ marginBottom: 10, border: '2px solid black' }}
                key={i}
              >
                <p style={{ margin: '4px' }}>Request:</p>
                <code>{JSON.stringify(debugThing.data)}</code>
                <br />
                <p style={{ margin: '4px' }}>Response: Error</p>
              </div>
            );
          }
          return (
            <div
              style={{ marginBottom: 10, border: '2px solid black' }}
              key={i}
            >
              <p style={{ margin: '4px' }}>
                Event:
                {debugThing.eventName}
              </p>
              <p style={{ margin: '4px' }}>Request:</p>
              <code>{JSON.stringify(debugThing.data)}</code>
              <br />

              <p style={{ margin: '4px' }}>Response:</p>
              <code>{JSON.stringify(debugThing.response)}</code>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const Root = () => {
  const [isSecondOpen, setSecondOpen] = useRecoilState<any>(shouldMenuBeOpen);
  const [notif] = useRecoilState(notificationState);
  const [debug, setDebug] = useRecoilState(debugState);
  const [deb, setDeb] = useState([]);
  const [noclip, setNoclip] = useState({ noclip: false, speed: 0, zoom: false });

  useNuiEvent('setVisible', (data: boolean) => {
    // This is our handler for the setVisible action.
    openState.isOpen = data;
  });

  useNuiEvent('setNoclip', (data: any) => {
    // This is our handler for the setVisible action.
    setNoclip(data);
    // openState.isOpen = data;
  });

  useNuiEvent('debug', (data: boolean) => {
    // This is our handler for the setVisible action.

    console.log('setDebug', data);
    setDebug(data);
  });

  useExitListener(() => {
    openState.isOpen = false;
  });

  function handleSetOpen(o: boolean) {
    openState.isOpen = o;
  }

  function closeSecondMenu() {
    if (isSecondOpen.open) {
      setSecondOpen(false);
    }
  }

  useEffect(() => {
    if (!(window as any).invokeNative) {
      setDebug(true);
    }

    const interval = setInterval(() => {
      // @ts-ignore
      if (window.debugRequests.length === deb.length) return;
      // @ts-ignore
      setDeb(window.debugRequests);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {debug && <DebugComponent isOpen={openState.isOpen} setOpen={handleSetOpen} deb={deb} />}
      <Noclip data={noclip} />

      <motion.div
        variants={variants}
        initial={{ x: 1000 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        animate={openState.isOpen ? 'visible' : 'hidden'}
      >
        <Huutista>
          {/* NOTIF */}

          <SecondContainer style={{ height: 'auto' }}>
            <motion.div
              variants={NotificationVariants as any}
              initial={{ x: 1000, zIndex: '0' } as any}
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
              variants={secondVariants as any}
              initial={{ x: 1000, zIndex: '0' } as any}
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

export default observer(Root);
