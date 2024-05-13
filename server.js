const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

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

  // Deprecated
  //   await mongoose.connect("mongodb://localhost:27017/post_db", {
  //     useUnifiedTopology: true,
  //     useNewUrlParser: true,
  //   });

  const dbName = "post_db";
  await mongoose.connect("mongodb://root:example@localhost:27017", {
    dbName: dbName,
  });
  console.log("Mongoose connected...");

  app.listen(4000, () => console.log("Server running on port 4000"));
}
startServer();
