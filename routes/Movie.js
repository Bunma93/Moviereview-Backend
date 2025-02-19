const express = require('express');
const router = express.Router();
const movieController = require('../controller/Movie');
const passport = require('passport');

const authentication = passport.authenticate("jwt", { session: false});

router.get('/', movieController.getAllMovies);
router.delete('/:id',authentication, movieController.deleteMovies);
router.post('/add', movieController.createMovies);

module.exports = router;