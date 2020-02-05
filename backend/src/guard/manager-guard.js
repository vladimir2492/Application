const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const verifyJwt = require('./verifyJwt');

module.exports = async function (req, res, next) { 
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const userAccess = await verifyJwt(bearerHeader);
        if(userAccess === 'Admin'){
            next();
        }
        else {
            res.status(403).send({error: true, message: 'You are not Admin.'});
        }
    }
}