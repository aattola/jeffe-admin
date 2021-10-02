/* eslint-disable react/prop-types */
// import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import './Styles/App.css';
import './Styles/ColorPicker.css';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react';

import { Toaster } from 'react-hot-toast';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';
import { useExitListener } from '../hooks/useExitListener';
import CardWrapper from './Card';
import openState from './state/OpenState';
import Noclip from './Dialogs/Noclip';
import { DebugComponent } from './DebugComponent';

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
  position: relative;
  /* //height: 100%; */
`;

const ContainerWithNoStyles = styled.div`
  margin: 40px;
  overflow: initial !important;
  width: 540px;
  height: calc(100% - 80px);
  position: relative;
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
    x: 30,
    zIndex: 123,
    height: '100%',
  },
  hidden: {
    opacity: 1,
    x: 600,
    zIndex: 0,
    height: '100%',
    pointerEvents: 'none',
  },
};

const Root = () => {
  const [deb, setDeb] = useState([]);
  const [elper, setElper] = useState(true);
  const [noclip, setNoclip] = useState({ noclip: false, speed: 0, zoom: false });

  useNuiEvent('setVisible', (data: boolean) => {
    // This is our handler for the setVisible action.
    openState.isOpen = data;
    setElper(false);
  });

  useNuiEvent('setNoclip', (data: any) => {
    // This is our handler for the setVisible action.
    setNoclip(data);
    // openState.isOpen = data;
  });

  useNuiEvent('debug', (data: boolean) => {
    // This is our handler for the setVisible action.

    openState.isDebugOpen = data;
  });

  useExitListener(() => {
    openState.isOpen = false;
  });

  function handleSetOpen(o: boolean) {
    openState.isOpen = o;
    setElper(false);
  }

  useEffect(() => {
    if (!(window as any).invokeNative) {
      openState.isDebugOpen = true;
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
      {openState.isDebugOpen && (
        <DebugComponent
          setNoclip={setNoclip}
          nData={noclip}
          isOpen={openState.isOpen}
          setOpen={handleSetOpen}
          deb={deb}
        />
      )}
      <Noclip data={noclip} />

      <Huutista>
        {/* NOTIF */}

        <SecondContainer style={{ height: 'auto' }}>
          <motion.div
            variants={NotificationVariants as any}
            initial={{ x: 1000, zIndex: '0' } as any}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
            animate={openState.isOpen ? 'visible' : 'hidden'}
          >
            <Container
              style={{ height: 'auto', width: '380px' }}
              elevation={0}
              sx={{ borderRadius: '12px', marginRight: '0px' }}
            >
              {/* <NotificationCard /> */}
              <Toaster
                position="top-right"
                containerStyle={{
                  inset: '0px',
                }}
                toastOptions={{
                  style: {
                    borderRadius: '12px',
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
            </Container>
          </motion.div>
        </SecondContainer>

        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => {
            setElper(true);
          }}
        >
          {openState.isOpen && (
            <motion.div
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              initial={{ opacity: 0, x: 1000 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 1000 }}
            >
              <Container
                elevation={4}
                sx={{ borderRadius: '12px', zIndex: 6 }}
              >
                <CardWrapper />
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
        {elper && (
          <ContainerWithNoStyles>
            <div />
          </ContainerWithNoStyles>
        )}
      </Huutista>
    </ThemeProvider>
  );
};

export default observer(Root);
