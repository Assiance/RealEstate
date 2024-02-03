const express = require('express');
const Agents = require('../db/agent-model');//imports the agent file
const Properties = require('../db/property-model');//imports the property file
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const agents = await Agents.findAll();
    res.send(agents)
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})
module.exports = router;