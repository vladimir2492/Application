const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const ProductService = require('../services/ProductService');
const path = require('path');
const ensureToken = require('../guard/ensureToken');

const productService = new ProductService();
__dirname = path.join(process.cwd(), '..', 'frontend', 'htmlFiles');

router.get('/data', ensureToken, async (req, res) => {
    let data = await productService.returnTableData(0, 10, null);
    res.send(200, data);
})

router.post('/add', ensureToken, async (req, res) => {
    const {
        category,
        model,
        discription,
        quantity,
        sales,
        price
    } = req.body;
    let id = uniqid();
    const newElement = {
        id,
        category,
        model,
        discription,
        quantity,
        sales,
        price
    };
    await productService.addRowInTable(newElement);
    res.status(200).send({ message: 'Add of product was successful', error: false });
})

router.post('/delete', ensureToken, async (req, res) => {
    const {
        id
    } = req.body;
    const result = await productService.deleteElementById(id);
    if(result){
        return res.status(200).send({ message: 'Delete was successful', error: false });  
    }
    return res.status(200).send({ message: 'Delete was wrong', error: true });
    
})

router.post('/edit', ensureToken, async (req, res) => {
    const {
        id,
        category,
        model,
        discription,
        quantity,
        sales,
        price
    } = req.body;
    let newElement = {
        id,
        category,
        model,
        discription,
        quantity,
        sales,
        price
    };
    await productService.editRow(newElement)
    res.status(200).send({ message: 'Edit of product was successful', error: false });
});

module.exports = router;