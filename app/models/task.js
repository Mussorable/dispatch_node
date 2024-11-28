const Sequelize = require('sequelize');

const sequelize = require('../util/database');

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
        },
        userId: {
            type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
        }
    }
)

module.exports = Task;