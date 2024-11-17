const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Truck = sequelize.define(
    'truck',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        number: {
            type: Sequelize.STRING(8),
            allowNull: false,
            validate: {
                notEmpty: true,
                isUppercase: true,
                is: /^\d[A-Za-z]\d \d{4}$/
            }
        },
    }
);

module.exports = Truck;