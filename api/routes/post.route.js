const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');
const checkAuth = require('../middlewares/check-auth');

router.post('/', checkAuth, PostController.create_tournament);
router.get('/', checkAuth, PostController.get_my_post);
router.post('/:id/like', checkAuth, PostController.like_post);
router.post('/:id/unlike', checkAuth, PostController.unlike_post);
router.post('/:id/comment', checkAuth, PostController.add_comment);

module.exports = router;