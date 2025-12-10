const { sequelize } = require('../config/connectTODb');
const db = {};

// 1. Load Models
db.Restaurant = require('./restaurant')(sequelize);
db.MenuItem = require('./menuItem')(sequelize);
db.Order = require('./order')(sequelize);

// 2. Define Relationships (Associations) - This is where the relationships are stored
// Restaurant <-> MenuItem (One-to-Many)
db.Restaurant.hasMany(db.MenuItem, {
    foreignKey: 'RestaurantId', // Stored in MenuItem table
    onDelete: 'CASCADE',
});
db.MenuItem.belongsTo(db.Restaurant, {
    foreignKey: 'RestaurantId',
});

// MenuItem <-> Order (One-to-Many)
db.MenuItem.hasMany(db.Order, {
    foreignKey: 'MenuItemId', // Stored in Order table
    onDelete: 'CASCADE',
});
db.Order.belongsTo(db.MenuItem, {
    foreignKey: 'MenuItemId',
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;