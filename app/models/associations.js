import User from "./user";
import Task from "./task";

User.hasMany(Task, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Task.belongsTo(User, {
    foreignKey: 'userId',
});

module.exports = {
    User,
    Task
};