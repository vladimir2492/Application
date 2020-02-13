const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async function (bearerHeader) {
    const userService = new UserService();
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    if(bearerToken === 'undefined' || !bearerToken){
       return {error: true}
    }
    const decode = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
    const userId = decode.id;
    if(userId.split('-')[0] === 'google'){
        return {error: false, id: decode.id, name: decode.name, img: decode.img, email: decode.email, access: decode.access};
    }
    const userData = await userService.returnRow('id', userId);
    return {id: userId, access: userData.access, name: userData.name, email: userData.email, error: false};
}
