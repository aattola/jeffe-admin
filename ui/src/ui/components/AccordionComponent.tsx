import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon, ListItemText,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/StarBorder';
import KeyboardIcon from '@mui/icons-material/Keyboard';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import NoclipSettings from './Settings/Noclip';
import Car from './Settings/Car';
import Weather from './Settings/Weather';
import Time from './Settings/Time';
import { fetchNui } from '../utils/fetchNui';
import asyncWrapper from '../utils/asyncWrapper';
import TeleportSettings from './Settings/Teleport';
import KickSettings from './Settings/Kick';
import menuState from './state/MenuState';
import FixComponent from './Settings/Fix';
import Weapon from './Settings/Weapon';
import SettingsMenuBuilder from './SettingsMenuBuilder';

const MenuData = {
  huutis: true,
  settings: [
    {
      name: 'Send message',
      components: [
        {
          type: 'TextField',
          default: 'Bruh',
          text: 'Testia field 1',
          id: 'text',
        },
        {
          type: 'TextField',
          default: 'Duh',
          text: 'Testia field 2',
          id: 'text2',
        },
        {
          type: 'Button',
          text: 'Testia',
          buttonText: 'YEP',
          id: 'nappi',
          variant: 'red',
        },
        {
          type: 'Button',
          text: 'Noclip',
          buttonText: 'Toggle',
          id: 'nappula',
          event: 'toggleNoclip',
        },
      ],
    },
  ],
};

const AccordionOptions = [
  {
    title: 'Spawn weapons',
    desc: 'Weapons',
    id: 100,
    components: [Weapon],
  },
  {
    title: 'DEV TESTI nappula',
    desc: 'nappi',
    id: 140,
    event: {
      event: 'jeffe-admin:toggleNoclip',
      data: {},
    },
    props: {
      settings: [
        {
          name: 'Test nappi ',
          components: [
            {
              type: 'Button',
              text: 'Noclip',
              buttonText: 'Toggle',
              id: 'nappula',
              event: 'toggleNoclip',
            },
          ],
        },
      ],
    },
    components: [SettingsMenuBuilder],
  },
  {
    title: 'DEV TEST',
    desc: 'doge',
    id: 150,
    props: MenuData,
    components: [SettingsMenuBuilder],
  },
  {
    title: 'Noclip',
    desc: 'Noclip around the town',
    id: 200,
    event: {
      event: 'jeffe-admin:toggleNoclip',
      data: {},
    },
    components: [NoclipSettings],
  },
  {
    title: 'Teleport',
    desc: 'tp',
    id: 300,
    components: [TeleportSettings],
  },
  {
    title: 'Kick player',
    desc: 'kick',
    id: 400,
    components: [KickSettings],
  },
  {
    title: 'Spawn car',
    desc: 'CAR',
    id: 500,
    components: [Car],
  },
  {
    title: 'Repair car',
    desc: 'CAR',
    id: 600,
    event: {
      event: 'jeffe-admin:car',
      data: { type: 'fix' },
    },
    components: [FixComponent],
  },
  {
    title: 'Weather',
    desc: 'emt 3',
    id: 700,
    components: [Weather],
  },
  {
    title: 'Time',
    desc: 'time',
    id: 800,
    components: [Time],
  },
];

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

function Accord(props: { accordion: typeof AccordionOptions[0]; binding: any}) {
  const { accordion, binding } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [bindMode, setBindMode] = useState(false);
  const open = Boolean(anchorEl);
  const [bind, setBind] = React.useState(binding?.internalBind || '0');
  const [error, setError] = React.useState('');

  const handleBind = (event: SelectChangeEvent) => {
    setBind(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setFavorite = async () => {
    const [, errori] = await asyncWrapper(fetchNui('favorite', { accordion: { id: accordion.id } }));
    if (errori) {
      const { error: err } = errori;
      setError(err);
      return;
    }

    await menuState.fetchFavorites();
  };

  const handleItemClick = async (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    const text = event.currentTarget.innerText;
    if (text === 'Bind') {
      setBindMode(true);
      setAccordionOpen(true);
    }

    if (text === 'Favorite') {
      setFavorite();
    }
  };

  function closeBindMode() {
    setAccordionOpen(false);
    setTimeout(() => {
      setBindMode(false);
    }, 200);
  }

  function handleChange(e: any, expanded: boolean) {
    if (open) return;
    if (e.target.nodeName !== 'DIV') return;
    setAccordionOpen(expanded);
    if (!expanded) {
      closeBindMode();
    }
  }

  async function handleBindSave() {
    const [, errori] = await asyncWrapper(fetchNui('bind', { bindSpot: bind, ...accordion.event }));
    if (errori) {
      const { error: err } = errori;
      setError(err);
      return;
    }

    await menuState.fetchBinds();
    closeBindMode();
  }

  return (
    <Accordion
      sx={{
        '&.MuiAccordion-root:before': {
          display: 'none',
        },
        marginBottom: '10px',
      }}
      expanded={accordionOpen}
      onChange={handleChange}
      TransitionProps={{ unmountOnExit: true }}
      key={accordion.title}
    >
      <AccordionSummary
        sx={{
          display: 'flex',
          borderBottom: accordionOpen ? '1px solid #f9f9f917' : '1px solid transparent',
          justifyContent: 'space-between',
          '.MuiAccordionSummary-contentGutters': {
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        }}
        expandIcon={<ExpandMoreIcon sx={{ pointerEvents: 'none' }} />}
        id="paneeli-emt"
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <ListItemIcon onClick={setFavorite}>
            {menuState.favorites?.indexOf((accordion.id as never)) >= 0 ? (
              <FavoriteIcon style={{ minWidth: '40px' }} fontSize="medium" />
            ) : (
              <FavoriteBorderIcon style={{ minWidth: '40px' }} fontSize="medium" />
            )}
          </ListItemIcon>
          <Typography sx={{ flexShrink: 0, pointerEvents: 'none' }}>
            {accordion.title}
          </Typography>

        </div>
        {binding && (
          <p
            style={{ margin: 0 }}
            onClick={() => {
              setBindMode(true);
              setAccordionOpen(true);
            }}
          >
            Bound to:
            {' '}
            {binding.internalBind}
          </p>
        )}
        {/* <Select */}
        {/*  options={[ */}
        {/*    { value: 'chocolate', label: 'Chocolate' }, */}
        {/*    { value: 'strawberry', label: 'Strawberry' }, */}
        {/*    { value: 'vanilla', label: 'Vanilla' }, */}
        {/*  ]} */}
        {/* /> */}
        {/* <FormControl sx={{ m: 1, padding: 0, margin: 0 }} variant="standard"> */}
        {/*  <Select */}
        {/*    value={10} */}

        {/*  > */}
        {/*    <MenuItem value={10}>Ten</MenuItem> */}
        {/*    <MenuItem value={20}>Twenty</MenuItem> */}
        {/*    <MenuItem value={30}>Thirty</MenuItem> */}
        {/*  </Select> */}
        {/* </FormControl> */}

        <IconButton
          sx={{ padding: '4px', marginRight: '8px' }}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          aria-label="more"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ minWidth: 200 }}
        >
          <MenuItem onClick={handleItemClick}>
            <ListItemIcon>
              {menuState.favorites?.indexOf((accordion.id as never)) >= 0 ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>Favorite</ListItemText>
          </MenuItem>
          {accordion.event && (
            <MenuItem onClick={handleItemClick}>
              <ListItemIcon>
                <KeyboardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Bind</ListItemText>
            </MenuItem>
          )}
        </Menu>

      </AccordionSummary>
      <AccordionDetails>
        {bindMode ? (
          <>
            {error && <p>{error}</p>}
            <FormControl sx={{ minWidth: 200, margin: '8px 0px' }}>
              <InputLabel id="bind-picker">Bind</InputLabel>
              <Select
                labelId="bind-picker"
                value={bind}
                onChange={handleBind}
                autoWidth
                label="Bind"
              >
                <MenuItem sx={{ m: 1, minWidth: 200 }} value={0}>
                  <em>None</em>
                </MenuItem>

                <MenuItem value={1}>Bind spot 1</MenuItem>
                <MenuItem value={2}>Bind spot 2</MenuItem>
                <MenuItem value={3}>Bind spot 3</MenuItem>
                <MenuItem value={4}>Bind spot 4</MenuItem>
                <MenuItem value={5}>Bind spot 5</MenuItem>
                <MenuItem value={6}>Bind spot 6</MenuItem>
                <MenuItem value={7}>Bind spot 7</MenuItem>
                <MenuItem value={8}>Bind spot 8</MenuItem>
                <MenuItem value={9}>Bind spot 9</MenuItem>

              </Select>
            </FormControl>

            <ButtonRow>

              <button onClick={closeBindMode} type="button" className="btn default">
                Cancel
              </button>
              <button onClick={handleBindSave} type="button" className="block red">
                Bind
              </button>
            </ButtonRow>
          </>
        ) : (accordion.components || []).map((Component: any, i: number) => (
          <div style={{ marginTop: '7px' }} key={i}>
            <Component MenuData={accordion.props ?? null} />
          </div>
        ))}

      </AccordionDetails>
    </Accordion>
  );
}

const AccordObserved = observer(Accord);

function AccordionComponent() {
  useEffect(() => {
    menuState.fetchBinds();
    menuState.fetchFavorites();
  }, []);

  const binds = menuState.binds.map((a: any) => a.event);
  const AccordionOptionsButBetterArray = AccordionOptions.map((option) => ({
    ...option,
    sortId: menuState.favorites?.indexOf((option.id as never)) >= 0 ? Number(String(option.id).slice(0, 2)) : option.id,
  }));
  const AccordionOptionsSorted = AccordionOptionsButBetterArray.sort((a, b) => a.sortId - b.sortId);

  return (
    <>
      {AccordionOptionsSorted.map((accordion) => (
        <AccordObserved binding={binds.indexOf(accordion.event?.event) > -1 ? menuState.binds[binds.indexOf(accordion.event?.event)] : null} key={accordion.title} accordion={accordion} />
      ))}
    </>
  );
}

export default observer(AccordionComponent);
