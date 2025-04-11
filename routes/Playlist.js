const express = require('express');
const router = express.Router();
const playlistController = require('../controller/Playlist');
const passport = require('passport');

const authentication = passport.authenticate("jwt", { session: false});

router.post('/create',authentication, playlistController.createPlaylist);
router.get('/myplaylist', authentication, playlistController.getPlaylistById);

module.exports = router;