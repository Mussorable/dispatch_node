const Truck = require('../models/truck');
const Trailer = require('../models/trailer');
const Driver = require("../models/driver");

exports.getVehicles = async (req, res) => {
    res.send('vehicles');
};

exports.addVehicle = async (req, res) => {
    const type = req.params.type;
    const {vehicleNumber, driverNumber, additionalNumber} = req.body;

    if (type === 'truck') {
        const existingTruck = await Truck.findOne({where: {number: vehicleNumber}});

        if (existingTruck) {
            return res.status(400).json({message: 'Truck already exists'});
        }

        const truck = await Truck.create({
            number: vehicleNumber,
        });

        res.status(201).json({
            message: 'Truck created successfully',
            truck: truck.get({plain: true})
        });
    } else if (type === 'trailer') {
        const existingTrailer = await Trailer.findOne({where: {number: vehicleNumber}});

        if (existingTrailer) {
            return res.status(400).json({message: 'Trailer already exists'});
        }

        const trailer = await Trailer.create({
            number: vehicleNumber,
        });

        res.status(201).json({
            message: 'Trailer created successfully',
            trailer: trailer.get({plain: true})
        });
    }
};

exports.removeVehicle = function(req, res) {
    res.send('removeVehicle');
}