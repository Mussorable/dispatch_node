const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Trailer = sequelize.define(
    'trailer',
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
                    is: /^\d[A-Za-z]\d \d{4}$/
            }
        }
    }
);

module.exports = Trailer;