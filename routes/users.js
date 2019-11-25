const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

// Router test
router.get('/test', (req, res) => {
    res.send('this is a test');
})

// POST / Create a new user
router.post('/', 
    [
      check('name', 'Please input a name').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })  
    ],
    async(req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        //Need to search for a user first
        try {
            let user = await User.findOne({ email });   //finding users by email because emails are unique

            if(user) {
                return res.status(400).send({ msg: 'User already exists' })
            }

            user = new User({
                name,
                email,
                password
            })

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.json(user);

            
        } catch (err) {
            console.error(err);
        }


    // res.send('recieved');
})


module.exports = router;