const Sequelize = require('sequelize');
const {sequelize} = require('../setup/db-setup')

const EmailVerifyModel = sequelize.define('verify', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
        },
    token: {
        type: Sequelize.STRING,
        allowNull: false
        }
    }, {
        timestamps: false
        });
       
    


module.exports = EmailVerifyModel;