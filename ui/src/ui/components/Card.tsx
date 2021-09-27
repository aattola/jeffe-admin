import React, { useState } from 'react';
import styled from 'styled-components';
import styledd from '@emotion/styled';
import Divider from '@mui/material/Divider';
import {
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails, InputLabel, MenuItem, FormControl, NativeSelect, InputBase, Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import NoclipSettings from './Settings/Noclip';
import SettingsMenuBuilder from './SettingsMenuBuilder';

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

const CustomSelect = styled(InputBase)`
  && {
    padding: 3px 20px;
    border: 2.5px solid #f9f9f9;
    background: #1e1e1e;
    color: white;
    border-radius: 4px;
    transition: all .2s ease;
  }
  
  :focus {
    background: #f9f9f9;
    border: 2.5px solid #f9f9f9;
    color: #1e1e1e;
    border-radius: 4px 4px 0 0;
  }
`;

const BootstrapInput = styledd(InputBase)(() => ({
  '& .MuiInputBase-input': {
    padding: '3px 20px',
    border: '2.5px solid #f9f9f9',
    background: '#1e1e1e',
    color: 'white',
    borderRadius: '4px',
    transition: 'all .2s ease',
    '&:focus': {
      background: '#f9f9f9',
      border: '2.5px solid #f9f9f9',
      color: '#1e1e1e',
      borderRadius: ' 4px',
    },
  },
}));

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

const AccordionOptions = [
  {
    title: 'Testi #1',
    bind: 'emt vie',
    desc: 'emt totakaa vie',
    components: [Kissa],
  },
  {
    title: 'Testi #13',
    bind: 'emt vie3',
    desc: 'emt 3',
    components: [NoclipSettings],
  },
  {
    title: 'Testi #Car',
    bind: 'emt vie3',
    desc: 'emt 3',
    components: [Car],
  },
  {
    title: 'Testi #Weather',
    bind: 'emt vie3',
    desc: 'emt 3',
    components: [Weather],
  },
  {
    title: 'Testi #Time',
    bind: 'emt vie3',
    desc: 'emt 3',
    components: [Time],
  },
];

function CardWrapper() {
  const settingMenus = ['Pelaaja', 'Autot', 'Sää'];
  const [selected, setSelected] = useState('');
  const [state, setState] = useRecoilState(secondMenu);
  // const [color, setColor] = useColor('rgb', { r: '1', g: '1', b: '1' });

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

              <SettingsMenuBuilder />

              {AccordionOptions.map((accordion) => (
                <Accordion TransitionProps={{ unmountOnExit: true }} key={accordion.title}>
                  <AccordionSummary sx={{ display: 'flex', alignItems: 'center' }} expandIcon={<ExpandMoreIcon />} id="paneeli-emt">
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {accordion.title}
                    </Typography>

                    {/* <Select */}
                    {/*  styles={customStyles} */}
                    {/*  isSearchable={false} */}
                    {/*  options={[ */}
                    {/*    { value: 'chocolate', label: 'Chocolate' }, */}
                    {/*    { value: 'strawberry', label: 'Strawberry' }, */}
                    {/*    { value: 'vanilla', label: 'Vanilla' }, */}
                    {/*  ]} */}
                    {/* /> */}
                    <FormControl sx={{ m: 1, padding: 0, margin: 0 }} variant="standard">
                      <Select
                        value={10}
                        input={<BootstrapInput />}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </AccordionSummary>
                  <AccordionDetails>
                    {(accordion.components || []).map((Component: any, i: number) => (
                      <span key={i}>
                        <Component />
                      </span>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}

              <Typography>Morjens asetuksia tos</Typography>
              {/* <ColorPicker */}
              {/*  width={456} */}
              {/*  height={228} */}
              {/*  color={color} */}
              {/*  onChange={setColor} */}
              {/*  hideHSV */}
              {/*  dark */}
              {/* /> */}

              <NoclipSettings />

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
