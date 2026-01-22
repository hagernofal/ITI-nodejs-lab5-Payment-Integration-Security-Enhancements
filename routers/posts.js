const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts");
const schemas = require("../schemas");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.use(authenticate);

// Create post
router.post(
  "/",
  validate(schemas.createPostSchema, "body"),
  postsController.createPost
);

// Get all posts
router.get(
  "/",
  validate(schemas.getAllPostsSchema, "query"),
  postsController.getAllPosts
);

// Get post by ID
router.get(
  "/:id",
  validate(schemas.updatePostSchema.paramsSchema, "params"),
  postsController.getPostById
);

// Update post by ID
router.patch(
  "/:id",
  validate(schemas.updatePostSchema.paramsSchema, "params"),
  validate(schemas.updatePostSchema.bodySchema, "body"),
  postsController.updatePostById
);

// Delete post by ID
router.delete(
  "/:id",
  validate(schemas.updatePostSchema.paramsSchema, "params"),
  postsController.deletePostById
);

module.exports = router;
