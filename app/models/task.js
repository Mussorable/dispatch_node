const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const User = require("./user");

const Task = sequelize.define(
    'task',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: Sequelize.STRING(72),
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        isImportant: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
)

module.exports = Task;