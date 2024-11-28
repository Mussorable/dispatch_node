const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Driver = sequelize.define(
    'driver',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        number: {
            type: Sequelize.STRING(4),
            allowNull: false,
            validate: {
                is: /\d{4}/
            }
        },
        fullName: {
            type: Sequelize.STRING(72),
            allowNull: false,
        },
        driverLicense: {
            type: Sequelize.STRING(12),
            allowNull: false,
        }
    }
);

module.exports = Driver;