const {validationResult} = require('express-validator');
const {Op} = require("sequelize");

exports.getAllRecords = async (Model, req, res, message) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    try {
        const records = await Model.findAll();
        res.status(200).json({
            message: message,
            data: records.map(record => record.get({plain: true}))
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'An error occurred while retrieving the records',
            error: err.message
        });
    }
};

exports.createRecord = async (Model, req, res, columnsToCheck, message) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    const condition = columnsToCheck.map(field => ({ [field]: req.body[field]} ));

    try {
        const existedRecord = await Model.findOne({
            where: {
                [Op.or]: condition
            }
        });
        if (existedRecord) {
            return res.status(400).json({message: 'Record already exists'});
        }

        const record = await Model.create(req.body);
        res.status(201).json({
            message: message,
            data: record.get({plain: true})
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'An error occurred while creating the record',
            error: err.message
        });
    }
};