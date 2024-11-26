const Task = require("./task");
const User = require("./user");
const Truck = require("./truck");
const Driver = require("./driver");
const Trailer = require("./trailer");

User.hasMany(Task, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
User.hasMany(Truck, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Driver.hasOne(Truck, {
    foreignKey: 'driverId',
    as: 'truck'
});
Truck.belongsTo(Driver, {
    foreignKey: 'driverId',
    as: 'driver'
});

Truck.hasOne(Trailer, {
    foreignKey: {
        name: 'truckId',
        allowNull: true
    },
    as: 'trailer'
});
Truck.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});
Trailer.belongsTo(Truck, {
    foreignKey: 'truckId',
    as: 'truck'
});

module.exports = {
    User,
    Task,
    Truck,
    Driver,
    Trailer
}