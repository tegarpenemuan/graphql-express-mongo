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
  },
};

module.exports = resolvers;
