const BaseService = require('./BaseService');
const ProductModel = require('../models/ProductModel');

class ProductService extends BaseService {
    constructor() {
        super(ProductModel);
    }
}


module.exports = ProductService;