'use client';

import { createTheme } from '@mui/material/styles';
import {outlinedInputClasses, inputLabelClasses, inputBaseClasses} from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#101112',
      light:'#A6ABB0'
    },
    secondary: {
      main: '#526ED3',
      contrastText: '#FFFFFF'
    },
    action: {
      disabledBackground: '#A1B1E7',
      disabled: '#FFFFFF',
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #526ED3',
          },
          '&.Mui-focused .MuiInputLabel-outlined': {
            color: 'red',
          },
        },
      }
    }
  }
});

export default theme;
