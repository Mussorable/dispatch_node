const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const vehicleController = require('../controllers/vehicles');

router.get('/get-all/:type', vehicleController.getVehicles);

router.post('/add/:type', [
    body('number')
        .isLength({min: 8, max: 8})
        .withMessage('Number must be 8 characters long'),
], vehicleController.addVehicle);

router.post('/connect-vehicle', vehicleController.connectVehicle);

module.exports = router;