import React from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './App';
import ThemeProvider from './providers/ThemeProvider';

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root') // eslint-disable-line no-undef
);

if (module.hot) module.hot.accept(); // eslint-disable-line no-undef
