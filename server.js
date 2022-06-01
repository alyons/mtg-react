const express = require('express');
const path = require('path');

const app = express();
// const NODE_ENV = process.env.NODE_ENV || 'development';
const DIST_DIR = __dirname; // eslint-disable-line no-undef
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const PORT = process.env.PORT || 3000;

app.use(express.static(DIST_DIR));
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(PORT, () => `Express server listening on ${PORT}`);
