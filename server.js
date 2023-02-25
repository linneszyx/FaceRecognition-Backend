/* Importing the modules that we need to use in our server. */
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
/* Connecting to the database. */
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "newpass",
    database: "facedb",
  },
});
/* A middleware that parses the incoming request body before the handlers, available under the req.body
property. */
app.use(express.json());

/* Allowing the server to accept requests from other domains. */
app.use(cors());

/* Calling the handleSignin function from the signin.js file. */
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

/* Calling the handleRegister function from the register.js file. */
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

/* Getting the user's profile by id. */
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

/* Updating the user's entries. */
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

/* Listening to the port 3000 and if it is running it will print the message. */
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
