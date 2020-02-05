
const Sequelize = require('sequelize');
const {sequelize} = require('../setup/db-setup')

const UserModel = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
        },
    name: {
        type: Sequelize.STRING,
        allowNull: false
        },
    email: {
        type: Sequelize.STRING,
        allowNull: false
        },
    login: {
        type: Sequelize.STRING,
        allowNull: false
        },
    password: {
        type: Sequelize.STRING,
        allowNull: false
        },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },    
    access: {
        type: Sequelize.STRING,
        allowNull: false
        }
    }, {
        timestamps: false
        });
       
    


module.exports = UserModel;