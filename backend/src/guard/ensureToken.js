const verifyJwt = require('./verifyJwt');
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader!='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if(bearerToken != undefined){
            //const verif = await verifyJwt(bearerToken);
            //console.log("verif = "+verif)
           next();
           return
        }
    }
    return res.status(400).send({message: 'undefined token in Ensuretoken function', error: true})
    /*if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if(bearerToken !== undefined){
            req.token = bearerToken;
            const result = await verifyJwt(req.token);
            console.log('verify token result = '+JSON.stringify(result))
            const result = false;
            if(!result.error){
               next();  
            }           
        }
        next()
    }
    return res.status(401).send({ message: 'Invalid credentials', error: true });*/
    
}

