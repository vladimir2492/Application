const verifyJwt = require('./verifyJwt');
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader!='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if(bearerToken != undefined){
           next();
           return;
        }
    }
    console.log('ensure token error')
    return res.status(400).send({message: 'undefined token in Ensuretoken function', error: true});    
}

