
const Sequelize = require('sequelize');
const {sequelize} = require('../setup/db-setup');


const ProductModel = sequelize.define('product', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
        },
    category: {
        type: Sequelize.STRING,
        allowNull: false
        },
    model: {
        type: Sequelize.STRING,
        allowNull: false
        },
    discription: {
        type: Sequelize.STRING,
        allowNull: false
        },
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
        },
    sales: {
        type: Sequelize.STRING,
        allowNull: false
        },
    price: {
        type: Sequelize.STRING,
        allowNull: false
        }
    }, {
    timestamps: false
        }); 
       
    
    


module.exports = ProductModel;