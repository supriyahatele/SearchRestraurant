const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MenuItem = sequelize.define('MenuItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    dishName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishPrice: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
  }, {
    tableName: 'MenuItems',
    timestamps: false,
  });

  return MenuItem;
};