import User from "./user";
import Task from "./task";
import Trailer from "./trailer";
import Truck from "./truck";

User.hasMany(Task, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Task.belongsTo(User, {
    foreignKey: 'userId',
});

Trailer.hasOne(Truck, {
    foreignKey: 'trailerId',
    as: 'truck'
});
Truck.belongsTo(Trailer, {
    foreignKey: {
        name: 'trailerId',
        allowNull: true
    },
    as: 'trailer'
});

module.exports = {
    User,
    Task,
    Trailer,
    Truck,
};