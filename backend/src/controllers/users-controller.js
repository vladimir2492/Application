const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserServise = require('../services/UserService');
const path = require('path');
__dirname = path.join(process.cwd(), '..', 'frontend', 'htmlFiles');
const managerGuard = require('../guard/manager-guard');
const ensureToken = require('../guard/ensureToken');
const VerifyEmailService = require('../services/VerifyEmailService');
const crypto = require('crypto');
const sendMail = require('./sendMail');

const userService = new UserServise();

router.get('/data', ensureToken , async (req, res) => {
    let data = await userService.returnTableData(0, 10, null);
    res.send(200, data);
})

router.post('/edit', managerGuard , ensureToken, async (req, res) => {
    const {id, name, email, login, password, access} = req.body;
    let newElement = {id, name, email, login, password, access};
    await userService.editRow(newElement);
    res.status(200).send('Edit of user was successful')
})

router.post('/add', managerGuard, ensureToken, async (req, res) => {
    const {name, email, login, password, access} = req.body;
    let row = await userService.returnRow('login', login)
    if (row) {
        return res.status(401).send({message: 'This login already exist!', error: true})
    }
    let id = uniqid();
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) throw err
        else {
            let password = hash;
            const newElement = {id, name, email, login, password, isVerified: false, access};
            await userService.addRowInTable(newElement);
            //add userId and emailToken in token table 
            const verifyEmailService = new VerifyEmailService();
            const emailToken =  crypto.randomBytes(16).toString('hex');
            verifyEmailService.addRowInTable({id, token: emailToken});
            //send mail for confirmation
            const emailText = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + emailToken + '.\n';
            sendMail(email, emailText);
            res.status(200).send('Add of new user was successful');
        }
    })
})

router.post('/registr', async (req, res) => {
    const { name, email, login, password, access} = req.body;
    const row = await userService.returnRow('login', login)
    if (row) {
        return res.status(401).send({message: 'This login already exist!', error: true})

    }
    let id = uniqid();
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) throw err
        else {
            let password = hash;
            const newElement = {id, name, email, login, password, isVerified: false, access};
            await userService.addRowInTable(newElement);
            //add userId and emailToken in token table 
            const verifyEmailService = new VerifyEmailService();
            const emailToken =  crypto.randomBytes(16).toString('hex');
            verifyEmailService.addRowInTable({id, token: emailToken});
            //send mail for confirmation
            const emailText = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + emailToken + '.\n';
            sendMail(email, emailText);
            res.status(200).send('Add of new user was successful');
        }
    })
})

router.post('/delete', managerGuard, ensureToken, async (req, res) => {
    const {
        id
    } = req.body;
    await userService.deleteElementById(id);
    //and delete row about this user in token table
    const verifyEmailService = new VerifyEmailService();
    const idVer = await verifyEmailService.returnRow('id', id);
    if(idVer){
        await verifyEmailService.deleteElementById(id)
    }  
    res.status(200).send('Delete of user was successful');
})

module.exports = router;