const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const { port } = require('./config');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Analysis - Backend API' })
});

app.post('/record', db.createRecord);

app.get('/list', db.listRecords);
  
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});