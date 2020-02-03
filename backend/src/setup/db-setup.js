
const Sequelize = require('sequelize');

function setupDB(name) {
    module.exports.sequelize = new Sequelize(name, 'root', '1234', {
        host: 'localhost',
        dialect: 'mysql',
       logging: false
    });
    module.exports.sequelize.sync();
    
}

module.exports = { setupDB };



