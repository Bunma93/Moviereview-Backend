const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig'); // โหลด multer
const userControllers = require('../controller/User');
const passport = require('passport');

const authentication = passport.authenticate("jwt", { session: false});

router.post('/register',upload.fields([
    { name: 'userimagePath', maxCount: 1},
    { name: 'userBackgroundImagePath', maxCount: 1},
    ]), userControllers.registerUser);
router.post('/login', userControllers.loginUser);
router.get('/profile', authentication, userControllers.getUserById);

module.exports = router;