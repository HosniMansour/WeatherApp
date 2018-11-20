const express = require('express');
const router = express.Router();
const userController = require('../../controllers/authController');

const CheckAuthInput = require('../../middlewares/check-auth-input');
const CheckRegisterInput = require('../../middlewares/check-existing-account');

/**
 * Register user
 */

router.post('/register', CheckAuthInput, CheckRegisterInput, userController.register);

/***
 * Authenticate user
 */
router.post('/login', CheckAuthInput, userController.login);

/***
 * cities
 */
router.post('/cities', userController.get);

/***
 * addcity
 */
router.post('/addcity', userController.update);



module.exports = router;