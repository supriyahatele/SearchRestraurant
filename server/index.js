const express = require('express');
// A. Import sequelize instance and ConnectionDb
const { sequelize, ConnectionDb } = require('./src/config/connectionToDb'); 

const { router } = require('./src/routes/restaurantRoute');
const seedDatabase = require('./src/seeder/seed');
// B. Import the seed function 


const app = express();
app.use(express.json());

const port = process.env.PORT|| 3000;

app.use('/api/v1',router)
app.listen(port, async () => {

    // 1. Check Connection
    await ConnectionDb(); 

    try {
        // 2. Synchronize (create tables)
        await sequelize.sync({ force: true });
        console.log('Database schemas synchronized.');

        // 3. Seed (fill tables with data)
     
        await seedDatabase(); 
        console.log('Database seeding complete!');

        // 4. Start Server
        console.log(`Server is listening on ${port}`);

    } catch (error) {
        console.error('Error during database sync or seeding:', error);
    }
});