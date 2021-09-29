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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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

const AccordionOptions = [
  {
    title: 'Spawn weapons',
    desc: 'Weapons',
    // event: {
    //   event: 'jeffe-admin:toggleNoclip',
    //   data: {},
    // },
    components: [Weapon],
  },
  {
    title: 'Noclip',
    desc: 'Noclip around the town',
    event: {
      event: 'jeffe-admin:toggleNoclip',
      data: {},
    },
    components: [NoclipSettings],
  },
  {
    title: 'Teleport',
    desc: 'tp',
    components: [TeleportSettings],
  },
  {
    title: 'Kick player',
    desc: 'kick',
    components: [KickSettings],
  },
  {
    title: 'Spawn car',
    desc: 'CAR',
    components: [Car],
  },
  {
    title: 'Repair car',
    desc: 'CAR',
    event: {
      event: 'jeffe-admin:car',
      data: { type: 'fix' },
    },
    components: [FixComponent],
  },
  {
    title: 'Weather',
    desc: 'emt 3',
    components: [Weather],
  },
  {
    title: 'Time',
    desc: 'time',
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

  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    const text = event.currentTarget.innerText;
    if (text === 'Bind') {
      setBindMode(true);
      setAccordionOpen(true);
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
        <Typography sx={{ width: '33%', flexShrink: 0, pointerEvents: 'none' }}>
          {accordion.title}
        </Typography>

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
              <FavoriteBorderIcon fontSize="small" />
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
            <Component />
          </div>
        ))}

      </AccordionDetails>
    </Accordion>
  );
}

function AccordionComponent() {
  useEffect(() => {
    menuState.fetchBinds();
  }, []);

  const binds = menuState.binds.map((a: any) => a.event);

  return (
    <>
      {AccordionOptions.map((accordion) => (
        <Accord binding={binds.indexOf(accordion.event?.event) > -1 ? menuState.binds[binds.indexOf(accordion.event?.event)] : null} key={accordion.title} accordion={accordion} />
      ))}
    </>
  );
}

export default observer(AccordionComponent);
