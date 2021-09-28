import React, { useState } from 'react';
import styled from 'styled-components';
import styledd from '@emotion/styled';
import Divider from '@mui/material/Divider';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  IconButton,
  InputBase,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRecoilState } from 'recoil';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Weather from './Weather';
import { fetchNui } from '../utils/fetchNui';
import Time from './Time';
import ErrorBoundary from './ErrorBoundary';
import Car from './Car';
import { secondMenu } from './state';

import 'react-color-palette/lib/css/styles.css';
import PlayerPicker from './PlayerPicker';
import Weapon from './Weapon';
import NoclipSettings from './Settings/Noclip';
import AccordionComponent from './AccordionComponent';
import TeleportSettings from './Settings/Teleport';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function CardWrapper() {
  const settingMenus = ['Pelaaja', 'Autot', 'Sää'];
  const [selected, setSelected] = useState('');
  const [state, setState] = useRecoilState(secondMenu);
  // const [color, setColor] = useColor('rgb', { r: '1', g: '1', b: '1' });

  const [personName, setPersonName] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const ITEM_HEIGHT = 12;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
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

              {/* <SettingsMenuBuilder /> */}

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

              <NoclipSettings />

              <TeleportSettings />

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
