const {validationResult} = require('express-validator');

const Driver = require('../models/driver');
const {getAllRecords, createRecord} = require("../util/modelOperations");

exports.getDrivers = async (req, res) => {
    await getAllRecords(Driver, req, res, 'Drivers retrieved successfully');
};

exports.addDriver = async (req, res)=> {
    await createRecord(Driver, req, res, ['number', 'driverLicense'], 'Driver created successfully');
}

exports.removeDriver = function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
    }
}