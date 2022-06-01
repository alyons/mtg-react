import React, { useContext, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Toolbar,
  Typography
} from '@mui/material';

import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
// import MilleniumPuzzleIcon from './MilleniumPuzzleIcon';
import { ThemeContext } from '../providers/ThemeProvider';

const APP_BAR_SX = {
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'center'
};

const CENTER_AREA_SX = {
  flexGrow: 1,
  justifyContent: 'center'
};

const DarkModeToggle = ({...props}) => {
  const { themeMode, toggleThemeMode } = useContext(ThemeContext);

  return (
    <IconButton color='inherit' onClick={toggleThemeMode}>
      {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

const Header = ({...props}) => {
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <AppBar position='sticky' sx={APP_BAR_SX}>
      <Container>
        <Toolbar>
          {/* <IconButton component={RouterLink} to='/' color='inherit'>
            <SvgIcon component={MilleniumPuzzleIcon} inheritViewBox />
          </IconButton> */}
          <Toolbar sx={CENTER_AREA_SX}>
            <Typography>MtG Card Search</Typography>
          </Toolbar>
          <DarkModeToggle />
          {/* <Box>
            <Menu id="header-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} color='inherit'>
              <MenuItem
                component={RouterLink}
                to='/'
                onClick={handleClose}
                >Home</MenuItem>
              <MenuItem
                component={RouterLink}
                to='/matches'
                onClick={handleClose}
                >Match History</MenuItem>
              <MenuItem
                component={RouterLink}
                to='/rules'
                onClick={handleClose}
                >Rules</MenuItem>
            </Menu>
            <IconButton aria-controls="header-menu" aria-haspopup="true" onClick={handleClick} color='inherit'>
              <MenuIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
