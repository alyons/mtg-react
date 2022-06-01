import { defaultTheme } from "./default";

export function getThemeByName(theme, mode = 'light') {
  switch(theme) {
    default: return defaultTheme(mode);
  }
};

export const themeNames = [
  'default'
];
