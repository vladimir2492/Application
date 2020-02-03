require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserServise = require('../services/UserService');
const path = require('path');
const jwt = require('jsonwebtoken');
const ensureToken = require('../guard/ensureToken');
const verifyJwt = require('../guard/verifyJwt');

const userService = new UserServise();

__dirname = path.join(process.cwd(), '..', 'frontend', 'htmlFiles');

router.post('/login', async (req, res) => {
    const {
        login,
        password
    } = req.body;    
    let row = await userService.returnRow('login', login);
    if (!row) {
        return res.status(401).send({ message: 'Invalid credentials', error: true });
    }
    const hash = row.password;    
    bcrypt.compare(password, hash, (err, result) => {
        if (result) {
            const token = jwt.sign({id: row.id}, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).send({ message: 'Locing complete', token });                 
        } else {
            return res.status(401).send({ message: 'Invalid credentials', error: true });
        }
    });
})


router.get('/access',ensureToken, async (req, res) =>{
    const bearerHeader = req.headers["authorization"];
    
    if(bearerHeader !== 'undefined'){
        const userAccess = await verifyJwt(bearerHeader);
               
        return res.status(200).send({message: userAccess, error: false})
    }
    return res.status(401).send({message: 'Invalid credentials', error: true})
})


router.post('/logout', ensureToken, (req, res) => {
    req.session.destroy(err => {
        res.clearCookie('token');
        res.status(200).send('Logout was successful')
        if (err) {
            return res.status(404).send('Log out error');
            
        }
    })
})




module.exports = router;