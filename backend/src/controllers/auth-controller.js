require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserServise = require('../services/UserService');
const path = require('path');
const jwt = require('jsonwebtoken');
const ensureToken = require('../guard/ensureToken');
const verifyJwt = require('../guard/verifyJwt');
const VerifyEmailService = require('../services/VerifyEmailService');

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
            const token = jwt.sign({id: row.id}, process.env.ACCESS_TOKEN_SECRET);
            //cheke user is verified(email)
            if(!row.isVerified){
                return res.status(401).send({message: 'User was nor verified (email)', error: true})
            }
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

router.get('/confirmation/:id', async (request, response) => {
    //take emailToken from req
    const token = request.params.id;
    const verifyEmailService = new VerifyEmailService();
    const row = await verifyEmailService.returnRow('token', token);
    const verifiedUser = row.id;
    //find in user table id of verified user and change isVerified on true
    newData = {id: verifiedUser, isVerified: true};
    await userService.editRow(newData);
    response.redirect('http:\/\/localhost:8081')
});




module.exports = router;