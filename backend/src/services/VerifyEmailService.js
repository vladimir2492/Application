const BaseService = require('./BaseService');
const VerifyModel = require('../models/EmailVerifyModel');

class VerifyEmailService extends BaseService {
    constructor() {
        super(VerifyModel);
    }
}

module.exports = VerifyEmailService;