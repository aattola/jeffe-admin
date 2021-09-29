import React from 'react';
import styled from 'styled-components';
import { Card } from '@mui/material';

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

export function DebugComponent(props:
  {
   nData: { noclip: boolean };
   setNoclip: (value: any) => void;
   isOpen: boolean;
   deb: any;
   setOpen: (value: boolean) => void
  }) {
  const {
    isOpen, setOpen, deb, nData, setNoclip,
  } = props;
  return (
    <Container
      style={{
        border: '2px solid black',
        borderRadius: 8,
        padding: 15,
        position: 'absolute',
        color: 'black',
        background: 'white',
      }}
    >
      <p>Debug nappeja</p>
      <button
        type="button"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        toggle menu ui
      </button>
      <button
        type="button"
        onClick={() => {
          setNoclip({ noclip: !nData.noclip, speed: 2 });
        }}
      >
        toggle noclip ui
      </button>

      <div style={{ overflowY: 'scroll', height: 'calc(100% - 70px)' }}>
        {deb.map((debugThing: any, i: number) => {
          if (debugThing.error) {
            return (
              <div
                style={{ marginBottom: 10, border: '2px solid black' }}
                key={i}
              >
                <p style={{ margin: '4px' }}>
                  Event:
                  {' '}
                  {debugThing.eventName}
                </p>
                <p style={{ margin: '4px' }}>Request:</p>
                <code>{JSON.stringify(debugThing.data)}</code>
                <br />
                <p style={{ margin: '4px' }}>Response:</p>
                <code>{JSON.stringify(debugThing.response)}</code>
              </div>
            );
          }
          return (
            <div
              style={{ marginBottom: 10, border: '2px solid black' }}
              key={i}
            >
              <p style={{ margin: '4px' }}>
                Event:
                {debugThing.eventName}
              </p>
              <p style={{ margin: '4px' }}>Request:</p>
              <code>{JSON.stringify(debugThing.data)}</code>
              <br />

              <p style={{ margin: '4px' }}>Response:</p>
              <code>{JSON.stringify(debugThing.response)}</code>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
