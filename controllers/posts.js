const PostService = require("../services/posts");
const APIError = require("../utils/APIError");

// create
const createPost = async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        throw new APIError("All fields are required", 400);
    }

    const post = await PostService.createPost(req.body, req.user.userId);
    res.status(201).json(post);
};

// get all
const getAllPosts = async (req, res) => {
    const result = await PostService.getAllPosts(req.query, req.user.userId);
    res.json(result);
};

// get by id
const getPostById = async (req, res) => {
    const { id } = req.params;

    const post = await PostService.getPostById(id, req.user.userId);

    if (!post) {
        throw new APIError("Post not found", 404);
    }

    res.status(200).json({ message: "Post retrieved successfully", post });
};

// update
const updatePostById = async (req, res) => {
    const { id } = req.params;
    const post = await PostService.updatePostById(id, req.body, req.user.userId);

    if (!post) {
        throw new APIError("Post not found", 404);
    }

    res.status(200).json({ message: "Post updated successfully", post });
};

// delete
const deletePostById = async (req, res) => {
    const { id } = req.params;
    const post = await PostService.deletePostById(id, req.user.userId);

    if (!post) {
        throw new APIError("Post not found", 404);
    }

    res.status(200).json({ message: "Post deleted successfully" });
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById
};
