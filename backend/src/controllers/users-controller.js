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

const userService = new UserServise();

router.get('/data', ensureToken , async (req, res) => {
    let data = await userService.returnTableData(0, 10, null);
    res.send(200, data);
})

router.post('/edit', managerGuard , ensureToken, async (req, res) => {
    const {
        id,
        name,
        email,
        login,
        password,
        access
    } = req.body;
    let newElement = {
        id,
        name,
        email,
        login,
        password,
        access
    };
    await userService.editRow(newElement);
    res.status(200).send('Edit of user was successful')
})

router.post('/add', managerGuard, ensureToken, async (req, res) => {
    const {
        name,
        email,
        login,
        password,
        access
    } = req.body;
    let row = await userService.returnRow('login', login)
    if (row) {
        res.sendFile(__dirname + '/htmlFiles/doubleLogin.html')
        return;
    }
    let id = uniqid();
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) throw err
        else {
            let password = hash;
            const newElement = {
                id,
                name,
                email,
                login,
                password,
                access
            };
            await userService.addRowInTable(newElement)
            res.status(200).send('Add of new user was successful');
        }
    })
})

router.post('/registr', async (req, res) => {
    const {
        name,
        email,
        login,
        password,
        access
    } = req.body;
    console.log('registr data on the server side = '+ name, email, login, password, access)
    let row = await userService.returnRow('login', login)
    if (row) {
        res.sendFile(__dirname + '/htmlFiles/doubleLogin.html')
        return;
    }
    let id = uniqid();
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) throw err
        else {
            let password = hash;
            const newElement = {
                id,
                name,
                email,
                login,
                password,
                access
            };
            await userService.addRowInTable(newElement)
            res.status(200).send('Add of new user was successful');
        }
    })
})

router.post('/delete', managerGuard, ensureToken, async (req, res) => {
    const {
        id
    } = req.body;
    await userService.deleteElementById(id)
    res.status(200).send('Delete of user was successful');
})

module.exports = router;