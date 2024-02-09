const express = require('express');
const { validateToken } = require('../utils/authentication');
const router = express.Router();
const Companies = require('../db/company-model');

router.get('/', validateToken, async (req, res) => {
  try {
    const companies = await Companies.findAll();
    res.send(companies)
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

router.post('/', validateToken, async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send('Name must have a value.')
      return;
    }
    if (!req.body.phone) {
      res.status(400).send('Phone must have a value.')
      return;
    }
    if (!req.body.yearFounded) {
      res.status(400).send('Year founded must have a value.')
      return;
    }
    if (!req.body.email) {
      res.status(400).send('email must have a value.')
      return;
    }
    let newCompany = await Agents.create({
      name: req.body.name,
      phone: req.body.phone,
      years_founded: req.body.yearsFounded,
      email: req.body.email
    });
    res.status(201).send(newCompany);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

module.exports = router;