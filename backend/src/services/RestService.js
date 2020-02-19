const BaseService = require('./BaseService');
const RestModel = require('../models/RestModel');

class RestService extends BaseService {
    constructor() {
        super(RestModel);
    }
}


module.exports = RestService;