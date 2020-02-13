require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserService = require('../services/UserService');
const path = require('path');
const jwt = require('jsonwebtoken');
const ensureToken = require('../guard/ensureToken');
const verifyJwt = require('../guard/verifyJwt');
const VerifyEmailService = require('../services/VerifyEmailService');
const crypto = require('crypto');
const userService = new UserService();
const uniqid = require('uniqid');

__dirname = path.join(process.cwd());

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


router.get('/access'/*,ensureToken,*/, async (req, res) =>{
    const bearerHeader = req.headers["authorization"];
    const userAccess = await verifyJwt(bearerHeader);
    console.log('user data in access path = ', JSON.stringify(userAccess, null, 4))
    if(!userAccess.error){
        return res.status(200).send({message: userAccess, error: false})
    }   
    return res.status(400).send({message: 'No access!', error: true})
})


router.post('/logout', ensureToken, (req, res) => {
    req.session.destroy(err => {
        res.clearCookie('token');
        res.status(200).send({message: 'Logout was successful', error: false})
        if (err) {
            return res.status(404).send({message: 'Log out error', error: true});
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

router.post('/upload', (req, res) =>{
    if(req.files === null){
        return res.status(400).send({message: 'No file uploaded', error: true})
    }
    const userId = req.body.id;
    const file = req.files.file;
    const nameArr = file.name.split('.');
    const resolution = nameArr[nameArr.length-1];
    const newFileName =  `${crypto.randomBytes(16).toString('hex')}.${resolution}`;

    file.mv(`${__dirname}/client/uploads/${newFileName}`, async(err) => {
        if(err){
            console.error(err);
            return res.status(500).send({message: ' Something happen! Error!', error: true})
        }
        //res.json({fileName: newFileName, filePath: `http:/uploads/${file.name}`})
        //put img name to database
        await userService.editRow({id: userId, img: newFileName})

    })
})  

router.post('/takeimg', async (req, res) => {
    const {id} = req.body;
    if(id === undefined){
        return res.status(400).send({message:'Have not user image in database', error:true})
    }
    const userRow = await userService.returnRow('id', id);
    const userImg = userRow.img;
    if(userImg){
        const path = `${__dirname}/client/uploads/${userImg}`;
        return res.sendFile(path);
    }
    return res.status(400).send({message:'Have not user image in database', error:true})
})

router.post('/googleauth', async (req, res) => {
    const {name, img, email, access} = req.body;
    console.log('googleauth path user data = ',JSON.stringify({name, img, email, access}, null, 4))
    if(!email){
        return res.status(400).send({message:'Error! There isn`t user email!', error: true})
    }
    const id = 'google-' + uniqid();
    const token = jwt.sign({id, name, email, access, img}, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).send({ message: token, error: false});
})


module.exports = router;