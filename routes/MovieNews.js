const express = require('express');
const router = express.Router();
const movienewsController = require('../controller/MovieNews');
const passport = require('passport');
const upload = require('../middlewares/multerConfig');

router.get('/', movienewsController.getAllNews);
router.post('/addNews', upload.single('newsimagePath'), movienewsController.createNews)

module.exports = router;