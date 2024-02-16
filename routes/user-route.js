const express = require('express');
const Users = require('../db/users-model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { createToken } = require('../utils/authentication')
const router = express.Router();


router.post('/', async (req, res) => {

    try {
        // when created first name is invaild
        if (!req.body.firstName) {
            res.status(400).send("FirstName must exist");
            return;
        }
        // when created last name is invaild
        if (!req.body.lastName) {
            res.status(400).send("LastName must exist");
            return;
        }
        // when creating email is invaild
        if (!req.body.email) {
            res.status(400).send("Email must exist");
            return;
        }
        // when created email is invaild by email format
        if (!validator.isEmail(req.body.email)) {
            res.status(400).send("Email is not an valid email format");
            return;
        }
        // when created password is invaild
        if (!req.body.password) {
            res.status(400).send("Password must exist");
            return;
        }
        //phone # not equal to 10 send error
        if (req.body.phone.length != 10) {
            res.status(400).send("Phone # must be 10 digitss");
            return;
        }
        // when created first name,last name, email, and password
        const userToCreate = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        };

        const createdUser = await Users.create(userToCreate);
        // when the password created will be hidden
        createdUser.password = undefined;

        res.status(201).send(createdUser);
    } catch (error) {

        console.log(error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
})

router.post('/login', async (req, res) => {
    try {
        // created login username that is invalid
        if (!req.body.username) {
            res.status(400).send("Username must exist");
            return;
        }
        // created login password that is invalid
        if (!req.body.password) {
            res.status(400).send("Password must exist");
            return;
        }
        // find one username in database
        const userFromDb = await Users.findOne({
            where: {
                email: req.body.username
            }
        })
        //
        let dbPassword = userFromDb?.password;
        if (!dbPassword) {
            dbPassword = "";
        }

        const validPassword = await bcrypt.compare(req.body.password, dbPassword);
        if (!validPassword) {
            res.status(400).send("Invalid Credentials");
            return;
        }

        const token = createToken(userFromDb);

        res.send(token);

    } catch (error) {

        console.log(error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
})

module.exports = router;