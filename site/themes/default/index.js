import { createTheme } from '@mui/material/styles';

export const defaultTheme = (mode = 'light') => {
  return createTheme({
    palette: {
      mode
    }
  });
};
