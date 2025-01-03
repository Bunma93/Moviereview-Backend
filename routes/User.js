const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig'); // โหลด multer
const userControllers = require('../controller/User');

router.post('/register',upload.single('userimagePath'), userControllers.registerUser);
router.post('/login', userControllers.loginUser);


module.exports = router;