
const { Restaurant, MenuItem, Order } = require('../models');

async function seedDatabase() {
    console.log('Starting database seed...');

    // 1. Define Restaurant Data
    const restaurantData = [
        { name: 'Pizza Palace', city: 'NYC' },
        { name: 'Burger Barn', city: 'LA' },
        { name: 'Spice Haven', city: 'Dallas' },
        { name: 'Royal Cuisine', city: 'Dallas' },
        { name: 'The Curry Pot', city: 'Chicago' },
        { name: 'Saffron Spice', city: 'Houston' },
        { name: 'Grand Taj', city: 'Atlanta' },
        { name: 'Taste of India', city: 'Boston' },
        { name: 'Delhi Darbar', city: 'Miami' },
        { name: 'Bombay Bistro', city: 'Denver' },
    ];

    // --- 1. Create Restaurants (and store them for later use) ---
    const restaurants = {};
    for (const data of restaurantData) {
        // Restaurant.create returns the created object with 'id'
        const restaurant = await Restaurant.create(data);
        // Store the created object using its name as the key for easy lookup
        restaurants[data.name] = restaurant;
    }

    // Convenience variables for the non-biryani items
    const pizzaPalace = restaurants['Pizza Palace'];
    const burgerBarn = restaurants['Burger Barn'];

    // 2. Define Biryani Menu Item Data (and link to the created restaurants)
    const biryaniMenuData = [
        { restaurantName: 'Pizza Palace', price: 150.00 },
        { restaurantName: 'Burger Barn', price: 200.00 },
        { restaurantName: 'Spice Haven', price: 160.50 },
        { restaurantName: 'Royal Cuisine', price: 220.00 },
        { restaurantName: 'The Curry Pot', price: 180.50 },
        { restaurantName: 'Saffron Spice', price: 165.00 },
        { restaurantName: 'Grand Taj', price: 200.00 },
        { restaurantName: 'Taste of India', price: 170.50 },
        { restaurantName: 'Delhi Darbar', price: 190.50 },
        { restaurantName: 'Bombay Bistro', price: 170.00 },
    ];
    // **<--- ADDED DATA FOR PANEER TIKKA MASALA (NEW DISH) --->**
    const paneerMenuData = [
        { restaurantName: 'Spice Haven', price: 190.00 },
        { restaurantName: 'Royal Cuisine', price: 225.50 },
        { restaurantName: 'The Curry Pot', price: 195.00 }, 
        { restaurantName: 'Saffron Spice', price: 210.00 },
        { restaurantName: 'Taste of India', price: 185.00 },
        { restaurantName: 'Bombay Bistro', price: 230.50 },
    ];
    // --- 2. Create MenuItems ---
    const biryaniMenuItems = {};
    const commonDishName = 'Biryani';
    for (const data of biryaniMenuData) {
        const restaurant = restaurants[data.restaurantName];
        if (restaurant) {
            const menuItem = await MenuItem.create({
                RestaurantId: restaurant.id,
                dishName: commonDishName,
                dishPrice: data.price
            });
            // Store the created menu item for order creation
            biryaniMenuItems[data.restaurantName] = menuItem;
        }
    }
    // **<--- NEW MENU ITEM CREATION BLOCK --->**
    const paneerMenuItems = {};
    const newCommonDishName = 'Paneer Tikka Masala';

    for (const data of paneerMenuData) {
        const restaurant = restaurants[data.restaurantName];
        if (restaurant) {
            const menuItem = await MenuItem.create({
                RestaurantId: restaurant.id,
                dishName: newCommonDishName,
                dishPrice: data.price
            });
            // Store the created menu item for order creation
            paneerMenuItems[data.restaurantName] = menuItem;
        }
    }
    // **<--- END NEW MENU ITEM CREATION BLOCK --->**

    // Create the other, non-biryani dishes
    const pepperoniPizza = await MenuItem.create({
        RestaurantId: pizzaPalace.id,
        dishName: 'Pepperoni Pizza',
        dishPrice: 15.00
    });
    const cheeseBurger = await MenuItem.create({
        RestaurantId: burgerBarn.id,
        dishName: 'Cheeseburger',
        dishPrice: 10.00
    });


    // 3. Order Data
    const orderData = [
        // Spice Haven (Biryani)
        { menuItem: biryaniMenuItems['Spice Haven'], quantities: [15, 10, 10, 10, 15, 15] },
        // Royal Cuisine (Biryani)
        { menuItem: biryaniMenuItems['Royal Cuisine'], quantities: [8, 7, 8, 7, 8, 7] },
        // Burger Barn (Biryani)
        { menuItem: biryaniMenuItems['Burger Barn'], quantities: [5, 3, 1, 15, 10] },
        // Pizza Palace (Biryani)
        { menuItem: biryaniMenuItems['Pizza Palace'], quantities: [15, 10] },
        // Saffron Spice (Biryani)
        { menuItem: biryaniMenuItems['Saffron Spice'], quantities: [20, 10] },
        // The Curry Pot (Biryani)
        { menuItem: biryaniMenuItems['The Curry Pot'], quantities: [25] },
        // Grand Taj (Biryani)
        { menuItem: biryaniMenuItems['Grand Taj'], quantities: [20] },
        // Taste of India (Biryani)
        { menuItem: biryaniMenuItems['Taste of India'], quantities: [10, 10] },
        // Delhi Darbar (Biryani)
        { menuItem: biryaniMenuItems['Delhi Darbar'], quantities: [12] },
        // Bombay Bistro (Biryani)
        { menuItem: biryaniMenuItems['Bombay Bistro'], quantities: [10] },
        
        // Spice Haven (Paneer)
        { menuItem: paneerMenuItems['Spice Haven'], quantities: [10, 5, 5] },
        // Royal Cuisine (Paneer)
        { menuItem: paneerMenuItems['Royal Cuisine'], quantities: [6, 4] },
        // Saffron Spice (Paneer)
        { menuItem: paneerMenuItems['Saffron Spice'], quantities: [15] },
        // The Curry Pot (Paneer)
        { menuItem: paneerMenuItems['The Curry Pot'], quantities: [8, 8, 4] },
        // Bombay Bistro (Paneer)
        { menuItem: paneerMenuItems['Bombay Bistro'], quantities: [12] },

        // Other Dishes
        { menuItem: pepperoniPizza, quantities: [5, 3] },
        { menuItem: cheeseBurger, quantities: [1] },
    ];

    // --- 3. Create Orders ---
    for (const data of orderData) {
        if (data.menuItem) {
            for (const quantity of data.quantities) {
                await Order.create({ MenuItemId: data.menuItem.id, quantity });
            }
        }
    }

    console.log('Database seeding complete!');
}
module.exports = seedDatabase;