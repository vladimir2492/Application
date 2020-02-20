const verifyJwt = require('./verifyJwt');

module.exports = async function (req, res, next, access) { 
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const userAccess = await verifyJwt(bearerHeader);
        for(let a of access){    
            if(userAccess.access === a){
                next();
                return;
            }
        }
    }                
    return res.status(403).send({error: true, message: 'You are not Admin.'}); 
}
    