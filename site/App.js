import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Router from './Router';

const ROOT_SX = {
  // alignItems: 'center',
  // justifyContent: 'center',
  bgcolor: (theme) => `${theme.palette.background.default}`,
  color: (theme) => `${theme.palette.text.primary}`,
  width: '100%',
  minHeight: '100%'
};

const App = ({...props}) => {
  return (
    <BrowserRouter>
      <Box sx={ROOT_SX}>
        <Header />
        <Router />
      </Box>
    </BrowserRouter>
  )
};

export default App;
