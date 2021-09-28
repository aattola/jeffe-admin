import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import styled from 'styled-components';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 8 + 8,
      width: 250,
    },
  },
};

const Subheader = styled(ListSubheader)`
  && {
    line-height: 30px;
    height: 30px;
    padding-left: 10px;
    background: #3a3a3a;
    text-transform: capitalize;
  }
`;

function CustomSelect(props: {items: {label: string, value: any, subheader?: boolean}[], setValue: (state: any) => void, label: string}) {
  const {
    label, setValue, items,
  } = props;
  const [value, setValueLocal] = useState('');

  function handleChange(e: SelectChangeEvent) {
    setValueLocal(e.target.value);
    setValue(e.target.value);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`custom-select-${label}`}>{label}</InputLabel>
      <Select
        MenuProps={MenuProps}
        id={`custom-select-${label}`}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {items.map((item) => {
          if (item.subheader) {
            return (
              <Subheader key={item.label + item.value}>{item.label}</Subheader>
            );
          }

          return (
            <MenuItem key={item.label + item.value} value={item.value}>{item.label}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  items: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomSelect;
