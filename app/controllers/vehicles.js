const Truck = require('../models/truck');
const Trailer = require('../models/trailer');
const {getAllRecords, createRecord} = require("../util/modelOperations");

exports.getVehicles = async (req, res) => {
    const type = req.params.type;
    if (type === 'trucks') {
        await getAllRecords(Truck, req, res, 'Trucks retrieved successfully');
    } else if (type === 'trailers') {
        await getAllRecords(Trailer, req, res, 'Trailers retrieved successfully');
    }
};

exports.addVehicle = async (req, res) => {
    const type = req.params.type;

    if (type === 'truck') {
        await createRecord(Truck, req, res, ['number'], 'Truck added successfully');
    } else if (type === 'trailer') {
        const response = await createRecord(Trailer, req, res, ['number'], 'Trailer added successfully');
        console.log(response);
    }
};

exports.removeVehicle = function(req, res) {
    res.send('removeVehicle');
}