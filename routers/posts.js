const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts");
const schemas = require("../schemas");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.use(authenticate);

router.get("/",validate(schemas.getAllPostsSchema, "query"),postsController.getAllPosts,);
router.get("/:id",validate(schemas.updatePostSchema.paramsSchema, "params"),postsController.getPostById,);

router.post("/",validate(schemas.createPostSchema, "body"),postsController.createPost,);
router.patch("/:id",validate(schemas.updatePostSchema.paramsSchema, "params"),validate(schemas.updatePostSchema.bodySchema, "body"),postsController.updatePostById,);
router.delete("/:id",validate(schemas.updatePostSchema.paramsSchema, "params"),postsController.deletePostById,);

module.exports = router;
