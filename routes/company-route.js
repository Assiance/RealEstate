const express = require('express');
const { validateToken } = require('../utils/authentication');
const router = express.Router();
const Companies = require('../db/company-model');
const Address = require('../db/address-model');

//this Get gets all companies and includes the address
router.get('/', validateToken, async (req, res) => {
  try {
    const companies = await Companies.findAll({
      include: [{
        model: Address
      }]
    });
    res.send(companies)
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

//this POST creates and validates the company/address models
router.post('/', validateToken, async (req, res) => {
  try {
    if (!req.body.street) {
      res.status(400).send('Street must have a value.')
      return;
    }
    if (!req.body.city) {
      res.status(400).send('City must have a value.')
      return;
    }
    if (!req.body.state) {
      res.status(400).send('State must have a value.')
      return;
    }
    if (!req.body.country) {
      res.status(400).send('Country must have a value.')
      return;
    }
    if (!req.body.zipcode) {
      res.status(400).send('Zipcode must have a value.')
      return;
    }
    if (!req.body.suiteNumber) {
      res.status(400).send('Suite number must have a value.')
      return;
    }
    let newCompanyAddress = await Address.create({
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipcode: req.body.zipcode,
      suite_number: req.body.suiteNumber
    });

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
    let newCompany = await Companies.create({
      name: req.body.name,
      phone: req.body.phone,
      year_founded: req.body.yearFounded,
      email: req.body.email,
      addressId: newCompanyAddress.id
    });
    //created a new object to join address/company models
    let myCompany = {
      name: newCompany.name,
      phone: newCompany.phone,
      year_founded: newCompany.yearFounded,
      email: newCompany.email,
      address: {
        street: newCompanyAddress.street,
        city: newCompanyAddress.city,
        state: newCompanyAddress.state,
        country: newCompanyAddress.country,
        zipcode: newCompanyAddress.zipcode,
        suite_number: newCompanyAddress.suiteNumber
      }
    }
    res.status(201).send(myCompany);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

//exports company router
module.exports = router;