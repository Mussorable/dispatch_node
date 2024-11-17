const express = require('express');
const router = express.Router();

const driverController = require('../controllers/drivers');

router.get('/get-all', driverController.getDrivers);

router.post('/add', driverController.addDriver);

module.exports = router;