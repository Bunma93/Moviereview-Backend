const express = require('express');
const router = express.Router();
const commentController = require('../controller/Comment');
const passport = require('passport');

const authentication = passport.authenticate("jwt", { session: false});

router.get('/', commentController.getAllComment);
router.delete('/:id', commentController.deleteComment);
router.post('/addcomment',authentication , commentController.createComment);

module.exports = router;