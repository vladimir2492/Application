const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const RestService = require('../services/RestService');
const ensureToken = require('../guard/ensureToken');
const restService = new RestService();
const accessGuard = require('../guard/access-guard');

router.get('/data', ensureToken, (req, res, next) => accessGuard(req, res, next, ['User', 'Admin', 'Owner']), async (req, res) => {
    let data = await restService.returnTableData();
    res.send(200, data);
})

router.post('/add', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Owner', 'Admin']), async (req, res) => {
    const {
        name,
        address,
        id_owner
    } = req.body;
    let row = await restService.returnRow('name', name);
    if (row) {
        return res.status(400).send({message: 'This name already exist!', error: true})
    }
    let id = uniqid();
    const newElement = {
        id,
        name, 
        address,
        id_owner
    };
    await restService.addRowInTable(newElement);
    res.status(200).send({ message: 'Add of restaurant was successful', error: false });
})

router.post('/delete', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Admin', 'Owner']), async (req, res) => {
    const {
        id
    } = req.body;
    const result = await restService.deleteElementById(id);
    if(result){
        return res.status(200).send({ message: 'Delete was successful', error: false });  
    }
    return res.status(200).send({ message: 'Delete was wrong', error: true });
    
})

router.post('/edit', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Owner', 'Admin']), async (req, res) => {
    const {
        id,
        name,
        address,
        id_owner
    } = req.body;
    let newElement = {
        id: id,
        name,
        address,
        id_owner
    };
    await restService.editRow(newElement)
    res.status(200).send({ message: 'Edit of restaurant was successful', error: false });
});

//возвращает всю инфу о принадлежащих владельцу ресторанах
router.post('/ownerrest', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Owner']), async(req, res) => {
    const {id_owner} = req.body;
    let owenRest=[];
    if(id_owner){
        const restData  = await restService.returnTableData();
        for(let rest of restData){
            if(rest.id_owner === id_owner){
                owenRest.push(rest);
            }
        }
        if(owenRest.length == 0){
            return res.status(400).send({message:`No one restaurant with owner id=${id_owner}`, error: true})
        }
        return res.status(200).send({message: owenRest, error: false})
    }
    return res.status(400).send({message: 'Empty req.body with id_owner data', error: true})
})


module.exports = router;