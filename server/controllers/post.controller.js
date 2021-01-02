// import dependencies
// load models
const Post = require("../models/post.model");

// load libs and utils
const validateMimeType = require("../utils/validateMimeType");
const addImage = require("../lib/addImage");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", { name: 1, image: 1 })
      .sort("-createdAt");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

exports.postCreatePost = async (req, res) => {
  try {
    let { meme } = req.files;
    if (meme === undefined || !meme.size)
      return res
        .status(400)
        .json({ error: "What's wrong with you dawg! Post a meme" });

    // check for valid mime type
    if (!validateMimeType(meme))
      return res.status(400).json({ error: "Invalid image type" });

    let content = await addImage(meme, req.publicDir);

    let { name, _id } = req.user;

    const newPost = new Post({ content, name, user: _id });

    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "There's error creating post" });
  }
};

exports.postLikePost = async (req, res) => {
  try {
    let { postId } = req.params;
    let userId = req.user._id;

    const post = await Post.findById(postId);

    const isLiked = post.likes.filter(
      (like) => like.user.toString() === userId.toString()
    );

    if (isLiked.length)
      return res
        .status(400)
        .json({ alreadyLiked: "User already liked this post" });

    post.likes.unshift({ user: userId });
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "There's error liking this  post" });
  }
};

exports.postUnlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    const isLiked = post.likes.filter(
      (like) => like.user.toString() === userId.toString()
    );

    if (isLiked.length === 0)
      return res
        .status(400)
        .json({ notLiked: "You haven't yet liked this post" });

    post.likes = post.likes.filter(
      (like) => like.user.toString() !== isLiked[0]["user"].toString()
    );

    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "There's error liking this  post" });
  }
};

exports.postAddCommentToPost = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    let { _id, name, image } = req.user;
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const comment = {
      name,
      image,
      text: escape(req.body.text),
      user: _id,
    };

    post.comments.unshift(comment);
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ postNotFound: "Error commenting on this post" });
  }
};

exports.deleteCommentFromPost = async (req, res) => {
  try {
    let { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    const isCommentExist = post.comments.filter(
      (comment) => comment._id.toString() === commentId.toString()
    );

    if (isCommentExist === 0)
      return res
        .status(404)
        .json({ commentNotFound: "Comment does not exist" });

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId.toString()
    );

    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ commentNotFound: "Error deleting the comment from this post" });
  }
};
