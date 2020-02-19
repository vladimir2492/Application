const Sequelize = require('sequelize');
const {sequelize} = require('../setup/db-setup');


const RestModel = sequelize.define('restaurant', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
        },
    name: {
        type: Sequelize.STRING,
        allowNull: false
        },
    address: {
        type: Sequelize.STRING,
        allowNull: false
        },
    id_owner: {
        type: Sequelize.STRING,
        allowNull: false
        }
    }, {
    timestamps: false
        }); 
       
module.exports = RestModel;