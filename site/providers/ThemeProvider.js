// Source: https://techinscribed.com/building-react-app-using-material-ui-with-support-for-multiple-switchable-themes/
// Source: https://dev.to/nas5w/toggling-light-dark-theme-in-react-with-usecontext-39hn

import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getThemeByName } from '../themes';

export const ThemeContext = createContext({
  themeName: 'default',
  updateThemeName: (themeName) => {},
  themeMode: 'light',
  toggleThemeMode: () => {}
});

const ThemeProvider = ({ children }) => {
  const currentThemeName = localStorage.getItem('appTheme') || 'default';
  const currentThemeMode = localStorage.getItem('appMode') || 'dark';

  const [themeName, setThemeName] = useState(currentThemeName);
  const [themeMode, setThemeType] = useState(currentThemeMode);
  const toggleThemeMode = () => {
    setThemeType(themeMode === 'light' ? 'dark' : 'light');
    localStorage.setItem('appMode', themeMode === 'light' ? 'dark' : 'light');
  };
  const updateThemeName = (themeName) => {
    setThemeName(themeName);
    localStorage.setItem('appMode', themeName);
  };

  const theme = useMemo(() => getThemeByName(themeName, themeMode), [themeName, themeMode]);

  return (
    <ThemeContext.Provider value={{ themeName, updateThemeName, themeMode, toggleThemeMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
