import React, { useState } from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import {
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Scrollbars } from 'react-custom-scrollbars-2';
import toast from 'react-hot-toast';
import { fetchNui } from '../utils/fetchNui';
import ErrorBoundary from './ErrorBoundary';

import 'react-color-palette/lib/css/styles.css';
import PlayerPicker from './PlayerPicker';
import AccordionComponent from './AccordionComponent';

const Topbar = styled.div`
  //border: 1px solid rgb(251 251 251 / 15%);
  padding: 15px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  height: 100%;
`;

const SettingsContainer = styled.div`
  padding: 15px 20px;
`;

const Text = styled.h1`
  font-family: Rubik; //'Plus Jakarta Sans'
  margin: 0px;
  font-size: 20px;
`;

const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function CardWrapper() {
  const notify = () => {
    toast('Here is your toast.');

    toast.promise(Delay(10000), {
      loading: 'Loading',
      success: 'Got the data',
      error: 'Error when fetching',
    });
  };

  return (
    <Container>
      <Topbar>
        <Text>Admin Menu</Text>

        <IconButton onClick={() => fetchNui('hideFrame')}>
          <CloseIcon />
        </IconButton>
      </Topbar>
      <Divider />

      <div style={{ height: 'calc(100% - 71px)' }}>
        <Scrollbars
          style={{ height: '-webkit-fill-available' }}
          autoHide
          autoHideTimeout={5000}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                background: '#5d5d5d',
                borderRadius: 24,
              }}
            />
          )}
        >
          <PlayerPicker />
          <Divider />
          <SettingsContainer>
            <ErrorBoundary>

              <AccordionComponent />

              <Typography>Morjens asetuksia tos</Typography>
              {/* <ColorPicker */}
              {/*  width={456} */}
              {/*  height={228} */}
              {/*  color={color} */}
              {/*  onChange={setColor} */}
              {/*  hideHSV */}
              {/*  dark */}
              {/* /> */}

              <button type="button" onClick={notify}>Toast</button>

              <button
                onClick={() => {
                  fetchNui('kickPlayer', { reason: 'OK client reason' });
                }}
                type="button"
                className="block red"
              >
                KICK
              </button>

              <button type="button" className="btn block inverted">
                Fivem
              </button>
              <button type="button" className="block red">
                Fivem
              </button>
              <button
                onClick={() => {
                  // @ts-ignore
                  alert('en tee mitään');
                }}
                type="button"
                className="btn block inverted"
              >
                Avaa valikko komponentilla
              </button>

              {/* <div style={{ marginBottom: '20px' }}> */}
              {/*  {selected ? ( */}
              {/*    <div onClick={() => setSelected('')} className="link"> */}
              {/*      <div className="links"> */}
              {/*        <Typography>Takaisin</Typography> */}
              {/*      </div> */}
              {/*    </div> */}
              {/*  ) : ( */}
              {/*    <SettingsGrid> */}
              {/*      {settingMenus.map((menuName) => ( */}
              {/*        <div */}
              {/*          onClick={() => setSelected(menuName)} */}
              {/*          key={menuName} */}
              {/*          className="link" */}
              {/*        > */}
              {/*          <div className="links"> */}
              {/*            <Typography>{menuName}</Typography> */}
              {/*          </div> */}
              {/*        </div> */}
              {/*      ))} */}
              {/*    </SettingsGrid> */}
              {/*  )} */}
              {/* </div> */}
              {/* {selected === 'Sää' && ( */}
              {/*  <> */}
              {/*    <Weather /> */}
              {/*    <Divider variant="middle" style={{ margin: '20px 0px' }} /> */}
              {/*    <Time /> */}
              {/*  </> */}
              {/* )} */}
            </ErrorBoundary>
          </SettingsContainer>
        </Scrollbars>
      </div>
    </Container>
  );
}

export default CardWrapper;
