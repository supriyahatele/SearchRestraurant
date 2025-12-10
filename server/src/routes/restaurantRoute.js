const express = require('express');
const { searchDishes } = require('../controllers/restaurantController');
const router = express.Router();
 
router.get('/search/dishes',searchDishes);

module.exports = {router};