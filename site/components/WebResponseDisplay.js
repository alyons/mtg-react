import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Typography
} from '@mui/material';

const WEB_RESPONSE_DISPLAY_SX = { };

const WebResponseDisplay = ({ display, error, fetching, ...props }) => {
  let { sx } = props;
  let applied_sx = Object.assign({}, WEB_RESPONSE_DISPLAY_SX, sx);

  let component = <Typography>No results to show...</Typography>;

  if (error) component = <Typography color='error'>{error.message}</Typography>;
  if (fetching) component = <CircularProgress />;
  if (display) component = display;

  return (
    <Box sx={applied_sx}>
      {component}
    </Box>
  );
};

export default WebResponseDisplay;
