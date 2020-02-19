
const Sequelize = require('sequelize');
const {sequelize} = require('../setup/db-setup');


const ReviewModel = sequelize.define('review', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
        },
    text_review: {
        type: Sequelize.STRING,
        allowNull: false
        },
    rating: {
        type: Sequelize.STRING,
        allowNull: false
        },
    rest_name: {
        type: Sequelize.STRING,
        allowNull: false
        },
    answer: {
        type: Sequelize.STRING,
        allowNull: true
        },
    date: {
        type: Sequelize.STRING,
        allowNull: true
    },
    visit_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
    }, {
    timestamps: false
        }); 
       
    
    


module.exports = ReviewModel;