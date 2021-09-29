import React, { useEffect, useState } from 'react';

import {
  FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import menuState from './state/MenuState';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 10px;
`;

const GridTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 10px;
  height: 100%;
  transition: all .2s ease;
  align-items: center;
  
  :hover {
    background: #c5c5c514;
  }
`;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const container = {
  hidden: { height: '25px', overflow: 'hidden' },
  show: {
    height: 'auto',
    overflow: 'hidden',
  },
};
const item = {
  hidden: {
    height: '25px',
    alignItems: 'start',
  },
  show: {
    height: '40px',
    display: 'grid',
    alignItems: 'center',
  },
};
const itemOpacity = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};
const fontSize = {
  large: {
    fontSize: '18px',
  },
  small: {
    fontSize: '16px',
  },
};

function PlayerPicker({ defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [p, setP] = useState('');
  useEffect(() => {
    menuState.fetchPlayers().then(() => null);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const [target] = menuState.players.filter((a) => a.guid === event.target.value);
    menuState.target = target;
    setP(event.target.value);
  };

  return (
    <>

      <motion.div
        variants={container}
        initial={{ height: '25px', overflow: 'hidden' }}
        animate={expanded ? 'show' : 'hidden'}
        transition={{ bounce: 0.1 }}
      >
        <motion.div variants={item} initial={{ height: '25px', alignItems: 'start' }} animate={expanded ? 'show' : 'hidden'}>
          <GridTitle
            onClick={() => setExpanded(!expanded)}
            style={{
              gridTemplateColumns: '1fr', textAlign: 'center', marginTop: 0, cursor: 'pointer',
            }}
          >
            {menuState.target && (
              <>
                <motion.div variants={fontSize} animate={expanded ? 'large' : 'small'}>
                  Target:
                  {' '}
                  {menuState.target.name}
                  {' '}
                  (
                  {menuState.target.id}
                  )
                  {' '}
                  {menuState.target.identifiers.steam}
                </motion.div>

              </>
            )}
          </GridTitle>
        </motion.div>
        <motion.div variants={itemOpacity} animate={expanded ? 'show' : 'hidden'}>
          <div style={{ padding: 15 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <FormControl fullWidth>
                <InputLabel id="player-select">Player</InputLabel>
                <Select
                  labelId="player-select"
                  value={p}
                  label="Player"
                  MenuProps={MenuProps}
                  onChange={handleChange}
                >
                  {menuState.players.map((player) => (
                    <MenuItem value={player.guid} key={player.guid}>
                      {player.id}
                      {' '}
                      -
                      {' '}
                      {player.name}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
              <IconButton onClick={() => menuState.fetchPlayers()} size="small" sx={{ width: 56 }} aria-label="refresh">
                <RefreshIcon />
              </IconButton>
            </div>

            <Grid>
              {menuState.target && (
                <>
                  <span>
                    IP:
                    {menuState.target.identifiers.ip}
                  </span>
                  <span>
                    Discord ID:
                    {menuState.target.identifiers.discord}
                  </span>
                </>
              )}
            </Grid>
          </div>
        </motion.div>

      </motion.div>

    </>
  );
}

PlayerPicker.propTypes = {
  defaultExpanded: PropTypes.bool,
};

PlayerPicker.defaultProps = {
  defaultExpanded: false,
};

export default observer(PlayerPicker);
