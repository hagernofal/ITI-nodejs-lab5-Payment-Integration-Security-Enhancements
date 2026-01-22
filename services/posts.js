const Post = require("../models/posts");
const APIError = require("../utils/APIError");

const createPost = async (postData, userId) => {
    const post = await Post.create({ ...postData, userId });
    return post;
};

const getAllPosts = async ({ page = 1, limit = 10 }, userId) => {
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    const posts = await Post.find()
        .skip(skip)
        .limit(limit)
        .populate("userId", "name email") 
        .lean();
    const postsWithOwner = posts.map(post => ({
        ...post,
        isOwner: post.userId?._id.toString() === userId.toString()
    }));

    const total = await Post.countDocuments();

    return {
        posts: postsWithOwner,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getPostById = async (id, userId) => {
    const post = await Post.findById(id)
        .populate("userId", "name email")
        .lean();

    if (!post) return null;

    post.isOwner = post.userId?._id.toString() === userId.toString();
    return post;
};

const updatePostById = async (id, postData, userId) => {
    const post = await Post.findById(id);
    if (!post) return null;

    if (post.userId.toString() !== userId.toString()) {
        throw new APIError("Forbidden: You are not the owner", 403);
    }

    Object.assign(post, postData);
    await post.save();
    return post;
};

const deletePostById = async (id, userId) => {
    const post = await Post.findById(id);
    if (!post) return null;

    if (post.userId.toString() !== userId.toString()) {
        throw new APIError("Forbidden: You are not the owner", 403);
    }

    await post.remove();
    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById
};
