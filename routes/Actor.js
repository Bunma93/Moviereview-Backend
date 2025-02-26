const express = require('express');
const router = express.Router();
const actorController = require('../controller/Actor');
const passport = require('passport');
const upload = require('../middlewares/multerConfig')

const authentication = passport.authenticate("jwt", { session: false});

router.get('/', actorController.getAllActors);
router.post('/add',upload.single('actorimagePath'), actorController.createActors);
router.delete('/:id', actorController.deleteActors);
router.put('/:id',upload.single('actorimagePath'), actorController.updateActors);

module.exports = router;