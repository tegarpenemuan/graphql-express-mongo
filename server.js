const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

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
