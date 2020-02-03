const BaseService = require('./BaseService');
const UserModel = require('../models/UserModel');

class UserService extends BaseService {
    constructor() {
        super(UserModel);
    }
}

module.exports = UserService;