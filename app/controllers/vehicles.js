const Truck = require('../models/truck');
const Trailer = require('../models/trailer');
const {getAllRecords, createRecord} = require("../util/modelOperations");
const {verify} = require("jsonwebtoken");
const User = require("../models/user");

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

exports.connectVehicle = async (req, res) => {
    const {truckNumber} = req.body;

    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    let decoded;
    try {
        decoded = verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while checking the token',
            error: err.message
        });
    }

    const truck = await Truck.findOne({where: {number: truckNumber}});
    if (!truck) {
        return res.status(404).json({message: 'Truck not found'});
    }
    if (truck.userId) {
        const connectedUser = await User.findByPk(truck.userId);
        return res.status(400).json({message: `Truck is already connected to user ${connectedUser.username}`});
    }

    const username = decoded.username;
    const user = await User.findOne({where: {username}});
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    truck.userId = user.id;
    await truck.save();

    res.status(200).json({message: 'Truck connected successfully'});
};

exports.removeVehicle = function(req, res) {
    res.send('removeVehicle');
}