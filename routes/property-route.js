const express = require('express');
const Address = require('../db/address-model');//imports the agent file
const Properties = require('../db/property-model');//imports the property file
const { validateToken } = require('../utils/authentication');//imports the validation token file
const router = express.Router();

router.post('/',validateToken, async (req, res) => {
  try {
    if (!req.body.num_of_bedrooms) {
      res.status(400).send("num_of_bedrooms must be a value")
      return;
    }
    if (!req.body.num_of_bathrooms) {
      res.status(400).send("num_of_bathrooms must be a value")
      return;
    }
    if (!req.body.has_HOA) {
      res.status(400).send("has_HOA must be a value")
      return;
    }
    if (!req.body.square_feet) {
      res.status(400).send("square_feet must be a value")
      return;
    }
    if (!req.body.year_built) {
      res.status(400).send("year_built must be a value")
      return;
    }
    if (!req.body.property_type) {
      res.status(400).send("property_type must be a value")
      return;
    }
    if (!req.body.sales_price) {
      res.status(400).send("sales_price must be a value")
      return;
    }
    if (!req.body.lot_size) {
      res.status(400).send("lot_size must be a value")
      return;
    }
    if (!req.body.stories) {
      res.status(400).send("stories must be a value")
      return;
    }


    const createProperties = await Properties.create({
      num_of_bedrooms: req.body.num_of_bedrooms,
      num_of_bathrooms: req.body.num_of_bathrooms,
      has_HOA: req.body.has_HOA,
      square_feet: req.body.square_feet,
      year_built: req.body.year_built,
      property_type: req.body.property_type,
      sales_price: req.body.sales_price,
      lot_size: req.body.lot_size,
      stories: req.body.stories,
      agentId: req.body.agentId,
      companyId: req.body.companyId
        
    })
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
    const newCompanyAddress = await Address.create({
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipcode: req.body.zipcode,
      suite_number: req.body.suiteNumber
    });

    const newProperties = {
      num_of_bedrooms: createProperties.num_of_bedrooms,
      num_of_bathrooms: createProperties.num_of_bathrooms,
      has_HOA: createProperties.has_HOA,
      square_feet: createProperties.square_feet,
      year_built: createProperties.year_built,
      property_type: createProperties.property_type,
      sales_price: createProperties.sales_price,
      lot_size: createProperties.lot_size,
      stories: createProperties.stories,
      agentId: createProperties.agentId,
      companyId: createProperties.companyId,
      address: {
        street: newCompanyAddress.street,
        city: newCompanyAddress.city,
        state: newCompanyAddress.state,
        country: newCompanyAddress.country,
        zipcode: newCompanyAddress.zipcode,
        suite_number: newCompanyAddress.suiteNumber
      }
    }
    res.status(201).send(newProperties)


  } catch (error) {

    console.log(error)

    res.status(500).send(`Internal Server Error ${error}`)
  }
});

router.get('/:id', validateToken , async (req, res) => {
  try {
    const toFindProperties = await Properties.findByPk({
      where:{
        id: req.params.id
      }, 
      include : Address

    })
    if (!toFindProperties) {
      res.status(404).send("Properties is not found")
      return;
    }
    res.send(toFindProperties)
    

  } catch (error) {
    console.log(error)
    res.status(500).send(`Internal Server Error ${error}`)
  }
})
router.get('/([?])', validateToken , async (req, res) =>{
  //example is in company route
  try {
    const toFindProperties = await Properties.findOne({
      where:{
        num_of_bedrooms: req.query.num_of_bedrooms,
        num_of_bathrooms: req.query.num_of_bathrooms,
        has_HOA: req.query.has_HOA,
        square_feet: req.query.square_feet,
        year_built: req.query.year_built,
        property_type: req.query.property_type,
        sales_price: req.query.sales_price,
        lot_size: req.query.lot_size,
        stories: req.query.stories,
        agentId: req.query.agentId,
        companyId: req.query.companyId
        
      }, 
      include : Address

    })
    if (!toFindProperties) {
      res.status(404).send("Properties is not found")
      return;
    }
    res.send(toFindProperties)
    

  } catch (error) {
    console.log(error)
    res.status(500).send(`Internal Server Error ${error}`)
  }
})


router.put('/:id', validateToken , async (req, res) => {
  try {
    if (!req.body.num_of_bedrooms) {
      res.status(400).send("num_of_bedrooms must be a value")
      return;
    }
    if (!req.body.num_of_bathrooms) {
      res.status(400).send("num_of_bathrooms must be a value")
      return;
    }
    if (!req.body.has_HOA) {
      res.status(400).send("has_HOA must be a value")
      return;
    }
    if (!req.body.square_feet) {
      res.status(400).send("square_feet must be a value")
      return;
    }
    if (!req.body.year_built) {
      res.status(400).send("year_built must be a value")
      return;
    }
    if (!req.body.property_type) {
      res.status(400).send("property_type must be a value")
      return;
    }
    if (!req.body.sales_price) {
      res.status(400).send("sales_price must be a value")
      return;
    }
    if (!req.body.lot_size) {
      res.status(400).send("lot_size must be a value")
      return;
    }
    if (!req.body.stories) {
      res.status(400).send("stories must be a value")
      return;
    }

    const toFindProperties = await Properties.findByPk(req.params.id)
    if (!toFindProperties) {
      res.status(404).send("Properties is not found")
      return;
    }

      toFindProperties.num_of_bedrooms = req.body.num_of_bedrooms,
      toFindProperties.num_of_bathrooms = req.body.num_of_bathrooms,
      toFindProperties.has_HOA = req.body.has_HOA,
      toFindProperties.square_feet = req.body.square_feet,
      toFindProperties.year_built = req.body.year_built,
      toFindProperties.property_type = req.body.property_type,
      toFindProperties.sales_price = req.body.sales_price,
      toFindProperties.lot_size = req.body.lot_size,
      toFindProperties.stories = req.body.stories

    await toFindProperties.save();
    res.status(200).send(toFindProperties)

  } catch (error) {
    console.log(error)
    res.status(500).send(`Internal Server Error ${error}`)


  }
});
router.delete('/properties/:id', validateToken , async (req, res) => {

  try {
    const propertiesToDelete = await Properties.findByPk(req.params.id);
    if (propertiesToDelete) {
      await propertiesToDelete.destroy();
      res.status(200).send(propertiesToDelete)

    }

  } catch (error) {
    console.log(error)
    res.status(500).send(`Internal Server Error ${error}`)
    return;
  }
});



module.exports = router;