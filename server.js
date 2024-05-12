const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
  },
};

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app, path: "/test" });

  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  app.listen(4000, () => console.log("Server running on port 4000"));
}
startServer();
