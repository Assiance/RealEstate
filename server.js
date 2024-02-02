const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { connectToDb } = require('./db/data-connections');
const { routes } = require('./routes/property-route');

app.use(bodyParser.json());
app.use('/', routes)

const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  await connectToDb();
})