const Truck = require('../models/truck');
const Trailer = require('../models/trailer');

exports.getVehicles = function(req, res) {
    res.send('vehicles');
};

exports.addVehicle = function(req, res) {
    res.send('addVehicle');
};

exports.removeVehicle = function(req, res) {
    res.send('removeVehicle');
}