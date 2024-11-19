const Truck = require('../models/truck');
const Trailer = require('../models/trailer');
const Driver = require("../models/driver");

exports.getVehicles = async (req, res) => {
    const type = req.params.type;
    if (type === 'trucks') {
        const trucks = await Truck.findAll();
        res.status(200).json({
            message: 'Trucks retrieved successfully',
            trucks: trucks.map(truck => truck.get({plain: true}))
        });
    } else if (type === 'trailers') {
        const trailers = await Trailer.findAll();
        res.status(200).json({
            message: 'Trailers retrieved successfully',
            trailers: trailers.map(trailer => trailer.get({plain: true}))
        });
    }
};

exports.addVehicle = async (req, res) => {
    const type = req.params.type;
    const {number, driverNumber, additionalNumber} = req.body;

    if (type === 'truck') {
        const existingTruck = await Truck.findOne({where: {number: number}});
        if (existingTruck) {
            return res.status(400).json({message: 'Truck already exists'});
        }

        const truck = await Truck.create({
            number: number,
        });

        res.status(201).json({
            message: 'Truck created successfully',
            truck: truck.get({plain: true})
        });
    } else if (type === 'trailer') {
        const existingTrailer = await Trailer.findOne({where: {number: number}});
        if (existingTrailer) {
            return res.status(400).json({message: 'Trailer already exists'});
        }

        const trailer = await Trailer.create({
            number: number,
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