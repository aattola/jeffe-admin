import {
  Color, ColorPicker, toColor, useColor,
} from 'react-color-palette';
import { throttle } from 'underscore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import styled from 'styled-components';

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 50px);
  grid-gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const Colorri = styled.div`
  height: 50px;
  width: 50px;
  background: ${(props) => props.color};
  border-radius: 4px;
  cursor: pointer;
`;

const colorOptions = [
  '#ff1744',
  '#d500f9',
  '#651fff',
  '#00b0ff',
  '#1de9b6',
  '#ffea00',
  '#f4511e',
  '#ffeb3b',
  '#212121',
  '#546e7a',
  '#ba000d',
  '#ba68c8',
  '#80deea',
  '#fff176',
];

// eslint-disable-next-line react/prop-types
function ColourPicker({ type, getColor }: { type: any; getColor: any }) {
  const [color, setColor] = useColor('hex', '#121212');

  const asetaColor = (e: string) => {
    const colour = toColor('hex', e);
    console.log(colour);
    getColor(colour, type);
    setColor(colour);
  };

  const asetaColorThrottle = (e: React.SetStateAction<Color>) => {
    const callMe = throttle(getColor, 200);
    setColor(e);
    callMe(e, type);
  };

  return (
    <Accordion
      style={{
        borderRadius: 2,
        backgroundColor: '#2d2d2d',
        borderLeft: `6px solid ${color.hex}`,
        marginTop: 10,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {type}
          Color
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* @ts-ignore */}
        <center>
          <ColorPicker
            width={460}
            height={228}
            color={color}
            hideRGB
            onChange={asetaColorThrottle}
            hideHSV
            dark
          />
          {/* @ts-ignore */}
        </center>

        <ColorGrid>
          {colorOptions.map((option) => (
            <span key={option}>
              {/* @ts-ignore */}
              <Colorri
                key={option}
                onClick={() => asetaColor(option)}
                color={option}
              />
            </span>
          ))}
        </ColorGrid>
      </AccordionDetails>
    </Accordion>
  );
}

export default ColourPicker;
