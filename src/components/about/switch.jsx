import React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import kashmiri from './kashmiri.svg'; // Update the path as needed
import english from './english.svg'; // Update the path as needed

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(${kashmiri})`,
        backgroundSize: 'cover', // Make the SVG cover the entire thumb
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: 20
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    // Default thumb styling when not checked
    backgroundColor: '#ffffff', // Set the fill to white
    width: 32,
    height: 32,
    borderRadius: '50%', // Make the thumb circular
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover', // Stretch the SVG to fill the thumb
      backgroundImage: `url(${english})`, // Apply English SVG in unchecked state
      backgroundPosition: 'center',
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#ffffff', // Make sure it's white in dark mode as well
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

export default function UISwitch() {
  return <MaterialUISwitch />;
}
