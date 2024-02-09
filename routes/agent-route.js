const express = require('express');
const Agents = require('../db/agent-model');//imports the agent file
const Properties = require('../db/property-model');//imports the property file
const { validateToken } = require('../utils/authentication');//imports the validation token file
const router = express.Router();
const Company = require('../db/company-model');

//this GET finds all agents in the database
router.get('/', validateToken, async (req, res) => {
  try {
    const agents = await Agents.findAll();
    res.send(agents)
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

//this GET finds an agent by their id
router.get('/:id', validateToken, async (req, res) => {
  try {
    const findAgents = await Agents.findByPk(req.params.id)
    if (!findAgents) {
      res.status(404).send('The agent is not found.');
      return;
    }
    res.send(findAgents);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

//this POST creates the agents in the database
router.post('/', validateToken, async (req, res) => {
  try {
    if (!req.body.firstName) {
      res.status(400).send('First name must have a value.')
      return;
    }
    if (!req.body.lastName) {
      res.status(400).send('Last name must have a value.')
      return;
    }
    if (!req.body.city) {
      res.status(400).send('city must have a value.')
      return;
    }
    if (!req.body.state) {
      res.status(400).send('state must have a value.')
      return;
    }
    if (!req.body.phone) {
      res.status(400).send('phone name must have a value.')
      return;
    }
    if (!req.body.yearsOfExperience) {
      res.status(400).send('First name must have a value.')
      return;
    }
    if (!req.body.about) {
      res.status(400).send('First name must have a value.')
      return;
    }
    if (!req.body.email) {
      res.status(400).send('First name must have a value.')
      return;
    }
    let newAgents = await Agents.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      city: req.body.city,
      state: req.body.state,
      phone: req.body.phone,
      years_experience: req.body.yearsOfExperience,
      about: req.body.about,
      email: req.body.email
    });
    res.status(201).send(newAgents);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

router.delete('/:id', validateToken, async (req, res) => {
  try {
    const deleteAgent = await Agents.findByPk(req.params.id);
    if (deleteAgent) {
      await deleteAgent.destroy();
    }
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

router.get('/:agentsId/companies', async (req, res) => {
  try {
    const company = await Company.findAll({
      where: {
        agentsId: req.params.agentsId
      }
    });
    res.send(company);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
});

module.exports = router;