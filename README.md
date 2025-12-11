## 🍽️ Restaurant Dish Search API

### Project Overview
A simple Node.js + Express + MySQL backend service that allows users to search for restaurants based on a dish name with a mandatory price range filter.
The API returns the top restaurants where the selected dish has been ordered the most.

### Project Type 
 Backend Project

### Features
- Search restaurants by dish name
- Mandatory price range filter
- Returns top 10 restaurants where the dish is ordered the most
- Includes restaurant details, dish name, price, and total order count


### Tech Stack
- Framework: Node.js with Express.js,
- Database: MYSQL , Sequelize(ORM)

### Other Tools
- Deployment:Render, Railway
- API Testing: Postman

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/supriyahatele/SearchRestraurant.git
   cd  SearchRestraurant
   npm install
2. Create a .env file in the root:
   - DB_URI=your_DB_URI
   - PORT=your_PORT
3. start the server with command : npm run dev

### Deployed Link:
- Backend : https://searchrestraurant-3.onrender.com

### API Endpoints
 - GET /api/v1/search/dishes?name=dishName&minPrice=minPrice&maxPrice=max

### Example 
 - GET [/api/v1/search/dishes?name=biryani&minPrice=150&maxPrice=300](https://searchrestraurant-3.onrender.com/api/v1/search/dishes?name=biryani&minPrice=150&maxPrice=300)

### Example Response
    "restaurants": [
        {
            "restaurantId": 3,
            "restaurantName": "Spice Haven",
            "city": "Dallas",
            "dishName": "Biryani",
            "dishPrice": 160.5,
            "orderCount": 6
        },
        {
            "restaurantId": 2,
            "restaurantName": "Burger Barn",
            "city": "LA",
            "dishName": "Biryani",
            "dishPrice": 200,
            "orderCount": 5
        },
        {
            "restaurantId": 1,
            "restaurantName": "Pizza Palace",
            "city": "NYC",
            "dishName": "Biryani",
            "dishPrice": 150,
            "orderCount": 2
        }  
    ]
