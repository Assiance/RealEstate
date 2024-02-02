const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const {connectToDb} = require('./db/data-connections')
const {properyRoutes} = require('./routes/property-route')
const {agentRoutes} = require('./routes/agent-route')
const {companyRoutes} = require('./routes/company-route')
const {userRoutes} = require('./routes/user-route')


app.use(bodyParser.json())
app.use('/', properyRoutes)
app.use('/', agentRoutes)
app.use('/', companyRoutes)
app.use('/', userRoutes)


const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  await connectToDb();
})