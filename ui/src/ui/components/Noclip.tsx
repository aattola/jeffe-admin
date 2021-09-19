import React from 'react';
import styled, { css } from 'styled-components';

const Pos = styled.div`
  position: absolute;
  z-index: 2323;
  right: 0px;
  top: 50%;
  transform: translate(-0%, -50%);
`;

const Card = styled.div`
  background: #272727;
  border-radius: 12px 0 0 12px;
  padding: 15px 25px;
  width: 200px;
  transition: all .2s ease;

  ${(a: {zoom: boolean}) => a.zoom && css`
    background: #3e3e3e;
  `}
`;

const P = styled.p`
  font-size: 14px;
`;

function Noclip({ data }: { data: {noclip: boolean, speed: number, zoom: boolean} }) {
  const zoomi = data.zoom ?? false;
  return (
    <Pos>
      {data.noclip && (
      <Card zoom={zoomi}>
        <h1 style={{ margin: 0, marginBottom: 10 }}>
          Noclip
        </h1>
        <P>
          Speed:
          {' '}
          {data.speed}
        </P>
        <P>PageUp to speed up</P>
        <P>PageDown to down</P>
        <P>Shift to zoom</P>
      </Card>
      )}
    </Pos>
  );
}

export default Noclip;
