module.exports = function (req, res, next) {  
    if (req.session.userId) {
        console.log('authguard said that req.session.userId = '+req.session.userId)
        next();
    } else {
        res.status(403).send({error: true, message: 'You are not logined.'});
    }
}
