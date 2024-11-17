const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const vehicleController = require('../controllers/vehicles');

router.get('/get-all', vehicleController.getVehicles);

router.post('/add/:type', [
    body('number')
        .isLength({min: 8, max: 8})
        .withMessage('Number must be 8 characters long'),
], vehicleController.addVehicle);

module.exports = router;