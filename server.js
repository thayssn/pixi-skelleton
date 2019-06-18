const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(8080, () => {
  /* eslint-disable no-console */
  console.log('All Good, Sir!');
  /* eslint-enable */
});
