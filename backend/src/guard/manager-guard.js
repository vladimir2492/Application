const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const verifyJwt = require('./verifyJwt');

module.exports = async function (req, res, next) { 
    /*let row = await userService.returnRow('id', req.session.userId);
    if (row.access == 'Admin') {
        next();
    } else {
        res.status(403).send({error: true, message: 'You are not Admin.'});
    }*/
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const userAccess = await verifyJwt(bearerHeader);
        /*const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const decode = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
        const userId = decode.id;
        const userData = await userService.returnRow('id', userId);
        const userAccess = userData.access;*/
        if(userAccess === 'Admin'){
            next();
        }
        else {
            res.status(403).send({error: true, message: 'You are not Admin.'});
        }
    }
}