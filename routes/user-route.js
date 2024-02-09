const express = require('express');
const Users = require('../db/data-connections');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { createToken } = require('../utils/authentication')
const router = express.Router();
//const userRoutes  = require('./routes/user-route');

router.post('/', async (req, res) => {

    try {
        // when creating first name is invaild
        if (!req.body.firstName) {
            res.status(400).send("FirstName must exist");
            return;
        }
        // when creating last name is invaild
        if (!req.body.lastName) {
            res.status(400).send("LastName must exist");
            return;
        }
        // when creating email is invaild
        if (!req.body.email) {
            res.status(400).send("Email must exist");
            return;
        }
        // when creating email is invaild by email format
        if (!validator.isEmail(req.body.email)) {
            res.status(400).send("Email is not an valid email format");
            return;
        }
        // when creating password is invaild
        if (!req.body.password) {
            res.status(400).send("Password must exist");
            return;
        }
        // when creating first name,last name, email, and password
        const userToCreate = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        const createdUser = await Users.create(userToCreate);
        // when the password created, it will be hidden
        createdUser.password = undefined;

        res.status(201).send(createdUser);
    } catch (error) {

        console.log(error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
})

router.post('/login', async (req, res) => {
    try {
        // creating login username that is invalid
        if (!req.body.username) {
            res.status(400).send("Username must exist");
            return;
        }
        // creating login password that is invalid
        if (!req.body.password) {
            res.status(400).send("Password must exist");
            return;
        }
        // finding one username in database
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