const { Op, Sequelize } = require('sequelize');
const db = require('../models');

// This function executes the complex join, aggregate, and filter logic using raw SQL
const fetchTopRestaurantsByOrderCount = async (dishName, minPrice, maxPrice) => {

    const replacements = {
        dishName: `%${dishName}%`,
        minPrice: minPrice,
        maxPrice: maxPrice
    };

    const rawQuery = `
        SELECT
            R.id AS restaurantId,
            R.name AS restaurantName,
            R.city AS city,
            MI.dishName AS dishName,
            MI.dishPrice AS dishPrice,
            count(O.id) AS orderCount
        FROM
            Restaurants AS R
        INNER JOIN 
            MenuItems AS MI ON R.id = MI.RestaurantId
        INNER JOIN 
            Orders AS O ON MI.id = O.MenuItemId
        WHERE
            MI.dishName LIKE :dishName  -- Filter by dish name (case-insensitive)
            AND MI.dishPrice BETWEEN :minPrice AND :maxPrice -- Mandatory price filter
        GROUP BY
            R.id, MI.id
        ORDER BY
            orderCount DESC
        LIMIT 10;
    `;

    // Execute the raw query
    // type: Sequelize.QueryTypes.SELECT ensures the result is an array of objects
    const results = await db.sequelize.query(rawQuery, {
        replacements,
        type: Sequelize.QueryTypes.SELECT
    });
    return results;
};


const searchDishes = async (req, res) => {
    try {
        const { name, minPrice, maxPrice } = req.query;

        // 1. Validation for mandatory filters
        if (!name || !minPrice || !maxPrice) {
            return res.status(400).json({ message: 'Missing mandatory query parameters: name, minPrice, and maxPrice are required.' });
        }
        const trimmedName = name.trim();
        if (trimmedName.length === 0) {
            return res.status(400).json({ message: 'The dish name parameter cannot be empty' });
        }
        // Convert and validate price parameters
        const minP = parseFloat(minPrice);
        const maxP = parseFloat(maxPrice);

        if (isNaN(minP) || isNaN(maxP) || minP < 0 || maxP < 0 || minP > maxP) {
            return res.status(400).json({ error: 'Invalid price range provided.' });
        }

        // 2. Call the raw query function
        const rawResults = await fetchTopRestaurantsByOrderCount(name, minP, maxP);

        // 3. Format the response to match the expected shape (camelCase keys)
        const formattedResults = rawResults.map(row => ({
            restaurantId: row.restaurantId,
            restaurantName: row.restaurantName,
            city: row.city,
            dishName: row.dishName,
            // Parse price and count to ensure correct data types
            dishPrice: parseFloat(row.dishPrice),
            orderCount: parseInt(row.orderCount, 10),
        }));

       return res.json({ restaurants: formattedResults });
    } catch (error) {
        console.error('Search error:', error);
      return  res.status(500).json({ error: 'An unexpected error occurred during search.' });
    }
};

module.exports = {
    searchDishes,
};