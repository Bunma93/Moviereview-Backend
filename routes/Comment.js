const express = require('express');
const router = express.Router();
const commentController = require('../controller/Comment');
const passport = require('passport');

const authentication = passport.authenticate("jwt", { session: false});

router.get('/',authentication, commentController.getAllComment);
router.delete('/:id',authentication, commentController.deleteComment);
router.post('/addcomment', commentController.createComment);

module.exports = router;