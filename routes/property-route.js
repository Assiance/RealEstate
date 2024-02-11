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
      stories: req.body.stories
    })
    res.status(201).send(createProperties)


  } catch (error) {

    console.log(error)

    res.status(500).send(`Internal Server Error ${error}`)
  }
});

router.get('/:id', validateToken , async (req, res) => {
  try {
    const toFindProperties = await Properties.findAll({
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
    return Address;

  } catch (error) {
    console.log(error)
    res.status(500).send(`Internal Server Error ${error}`)
  }
})
router.get('/([\?])type', validateToken , async (req, res) =>{
  try {
    const toFindProperties = await Properties.findOne({
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
    return Address;

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

    }

  } catch (error) {
    console.log(error)
    res.status(500).send(`Internal Server Error ${error}`)
    return;
  }
});



module.exports = router;