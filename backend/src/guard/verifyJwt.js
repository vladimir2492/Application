const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

module.exports = async function (bearerHeader) {
    const userService = new UserService();
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const decode = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
    const userId = decode.id;
    const userData = await userService.returnRow('id', userId);
    return userData.access;
}
