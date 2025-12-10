const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI);

async function ConnectionDb() {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, ConnectionDb };