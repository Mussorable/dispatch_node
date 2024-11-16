const Task = require('../models/task');

exports.getTasks = function(req, res) {
    res.send('tasks');
};

exports.addTask = function(req, res) {
    res.send('addTask');
};

exports.removeTask = function(req, res) {
    res.send('removeTask');
};