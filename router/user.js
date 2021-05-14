const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')





router.post('/add/:id', userController.addUser);








module.exports = router;