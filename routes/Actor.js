const express = require('express');
const router = express.Router();
const actorController = require('../controller/Actor');
const passport = require('passport');
const upload = require('../middlewares/multerConfig')

const authentication = passport.authenticate("jwt", { session: false});

router.post('/add',upload.single('actorimagePath'), actorController.createActors);

module.exports = router;