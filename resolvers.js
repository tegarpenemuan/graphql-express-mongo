const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getAllPosts: async () => {
      const posts = await Post.find();
      return posts;
    },
    // Cara 1
    // getPost: async (parent, args, context, info) => {
    //   const { id } = args;
    //   return await Post.findById(id);
    // },
    // Cara 2
    getPost: async (_parent, { id }, _context, _info) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Ok, post deleted";
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }
      if (description !== undefined) {
        updates.description = description;
      }
      const post = await Post.findByIdAndUpdate(id, updates, { new: true });
      return post;
    },
  },
};

module.exports = resolvers;
