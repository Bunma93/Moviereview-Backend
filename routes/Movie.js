const express = require('express');
const router = express.Router();
const movieController = require('../controller/Movie');
const passport = require('passport');
const upload = require('../middlewares/multerConfig'); // โหลด multer

const authentication = passport.authenticate("jwt", { session: false});

router.get('/', movieController.getAllMovies);
router.delete('/:id',authentication, movieController.deleteMovies);
router.post('/add', upload.fields([
    { name: 'posterimagePath', maxCount: 1 }, 
    { name: 'backgroundimagePath', maxCount: 3 }
  ]), movieController.createMovies);
module.exports = router;