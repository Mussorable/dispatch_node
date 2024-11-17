const {validationResult} = require('express-validator');

const Driver = require('../models/driver');
const {Op} = require("sequelize");

exports.getDrivers = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
    }

    try {
        const drivers = await Driver.findAll();
        res.status(200).json({
            message: 'Drivers retrieved successfully',
            drivers: drivers.map(driver => driver.get({plain: true}))
        });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while retrieving the drivers',
            error: err.message
        });
    }
};

exports.addDriver = async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
    }

    const {fullName, number, driverLicense} = req.body;

    try {
        const existedDriver = await Driver.findOne({
            where: {
                [Op.or]: [
                    {number: number},
                    {driverLicense: driverLicense}
                ]
            }
        });
        if (existedDriver) {
            return res.status(409).json({
                message: 'Current driver already exists.',
                error: 'Driver already exists'
            });
        }

        const driver = new Driver({
            number: number,
            fullName: fullName,
            driverLicense: driverLicense
        });

        await driver.save();

        res.status(201).json({
            message: 'Driver created successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while creating the driver',
            error: err.message
        });
    }
}

exports.removeDriver = function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
    }
}