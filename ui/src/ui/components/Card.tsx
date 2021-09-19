import React, { useState } from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ColorPicker, useColor } from 'react-color-palette';
import Weather from './Weather';
import { fetchNui } from '../utils/fetchNui';
import Time from './Time';
import ErrorBoundary from './ErrorBoundary';
import Car from './Car';
import { errorState, secondMenu } from './state';

import 'react-color-palette/lib/css/styles.css';
import PlayerPicker from './PlayerPicker';
import Weapon from './Weapon';

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

const SettingsGrid = styled.div`
  grid-template-rows: 1fr;
  grid-gap: 10px;
  display: grid;
`;

function Kissa() {
  const [kisu, orava] = useState('kissa');
  const [state, setState] = useRecoilState(secondMenu);

  return (
    <>
      <h1>{kisu}</h1>
      <button type="button" onClick={() => orava('orava')}>
        orava
      </button>

      <button
        onClick={() => {
          // @ts-ignore
          setState({ open: true, components: [Weather] });
        }}
        type="button"
        className="btn block inverted"
      >
        Avaa valikko komponentilla
      </button>
    </>
  );
}

function CardWrapper() {
  const settingMenus = ['Pelaaja', 'Autot', 'Sää'];
  const [selected, setSelected] = useState('');
  const [state, setState] = useRecoilState(secondMenu);
  // const [color, setColor] = useColor('rgb', { r: '1', g: '1', b: '1' });

  return (
    <Container>
      <Topbar>
        <Text>Admin Valikko</Text>

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
          <SettingsContainer>
            <ErrorBoundary>
              <Typography>Morjens asetuksia tos</Typography>
              {/* <ColorPicker */}
              {/*  width={456} */}
              {/*  height={228} */}
              {/*  color={color} */}
              {/*  onChange={setColor} */}
              {/*  hideHSV */}
              {/*  dark */}
              {/* /> */}

              <button type="button" className="btn block inverted">
                Fivem
              </button>
              <button type="button" className="block red">
                Fivem
              </button>
              <button
                onClick={() => {
                  // @ts-ignore
                  setState({ open: true, components: [Weather, Kissa] });
                }}
                type="button"
                className="btn block inverted"
              >
                Avaa valikko komponentilla
              </button>

              <div style={{ margin: '30px 0px' }}>
                <Weapon />
              </div>

              <PlayerPicker />
              <Divider variant="middle" style={{ margin: '20px 0px' }} />
              <Car />
              <Divider variant="middle" style={{ margin: '20px 0px' }} />
              <Weather />
              <Divider variant="middle" style={{ margin: '20px 0px' }} />
              <Time />
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
