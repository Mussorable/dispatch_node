const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define(
    'user',
    {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        username: {
            type: Sequelize.STRING(64),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING(64),
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        passwordToken: {
            type: Sequelize.STRING(255),
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        passwordExpiration: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        }
    }
);

module.exports = User;