const express = require('express');
const router = express.Router();
const genreController = require('../controller/Genre')

router.get('/', genreController.getAllGenre);

module.exports = router;