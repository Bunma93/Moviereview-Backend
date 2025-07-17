const express = require('express');
const router = express.Router();
const commentController = require('../controller/Comment');
const passport = require('passport');

const authentication = passport.authenticate("jwt", { session: false});

router.get('/', commentController.getAllComment);
router.get('/commentById',authentication, commentController.getCommentById);
router.delete('/:id',authentication , commentController.deleteComment);
router.post('/addcomment',authentication , commentController.createComment);
router.put("/:id",authentication, commentController.updateComment);


module.exports = router;