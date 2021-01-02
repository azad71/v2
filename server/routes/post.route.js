// importing dependencies
// load libraries
const router = require("express").Router();
const passport = require("passport");

// load controllers
const postControllers = require("../controllers/post.controller");

// @route GET api/posts
// @desc Get posts
// @access Public
router.get("/", postControllers.getPosts);


// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postControllers.postCreatePost
);


// @route POST api/posts/like/:postId
// @desc  Like post
// @access Private
router.post(
  "/like/:postId",
  passport.authenticate("jwt", { session: false }),
  postControllers.postLikePost
);

// @route POST api/posts/unlike/:postId
// @desc  Unlike post
// @access Private
router.post(
  "/unlike/:postId",
  passport.authenticate("jwt", { session: false }),
  postControllers.postUnlikePost
);

// @route POST api/posts/comment/:postId
// @desc  Add comment to the post
// @access Private
router.post(
  "/comment/:postId",
  passport.authenticate("jwt", { session: false }),
  postControllers.postAddCommentToPost
);

// @route DELETE api/posts/:postId/comment/:comment_id
// @desc  Delete comment from the post
// @access Private
router.delete(
  "/:postId/comment/:commentId",
  passport.authenticate("jwt", { session: false }),
  postControllers.deleteCommentFromPost
);

module.exports = router;
