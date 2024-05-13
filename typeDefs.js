const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    description: String
  }

  type Query {
    hello: String

    getAllPosts: [Post]
    getPost(id: ID): Post
  }

  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): Post
    updatePost(id: ID, post: PostInput): Post
  }
`;

// cara 1
// type Mutation {
//   createPost(title: String, description: String): Post
// }

// cara 2
// input PostInput {
//     title: String
//     description: String
//   }

//   type Mutation {
//     createPost(post: PostInput): Post
//   }

module.exports = typeDefs;
