import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #FEFEE1BF',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Rubik',
    '&:focus': {
      transitionDuration: '0.15s',
      borderRadius: 0,
      borderColor: '#f40552',
      boxShadow: '0 0 17px 0.2rem rgb(244 5 82 / 5%)',
    },
  },
}));

const CustomTextInput2 = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #FEFEE1BF',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Rubik',
    '&:focus': {
      transitionDuration: '0.15s',
      borderRadius: 0,
      borderColor: '#f40552',
      boxShadow: '0 0 17px 0.2rem rgb(244 5 82 / 5%)',
    },
  },
}));

const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #FEFEE1BF',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Rubik',
    '&:focus': {
      transitionDuration: '0.15s',
      borderRadius: 0,
      borderColor: '#f40552',
      boxShadow: '0 0 17px 0.2rem rgb(244 5 82 / 5%)',
    },
  },
}));

function CustomTextInput(props: any) {
  return <CustomTextInput2 {...props} />;
}

function TextInput(props: any) {
  return <BootstrapInput {...props} />;
}

export {
  BootstrapInput, CustomTextInput, CustomAutocomplete, TextInput,
};
