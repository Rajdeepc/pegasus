const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const path = require('path');

const dotenv = require("dotenv");
dotenv.config(); // to pull local configuration from .env file

const corsOptions = {
  exposedHeaders:
    "Content-Range,X-Content-Range,ETag,Vary,Content-Type,Content-Encoding,Date,Expires,Cache-Control,X-Content-Type-Options,X-Frame-Options,Content-Security-Policy,X-XSS-Protection,Server,Alt-Svc,Transfer-Encoding"
};

// setup your middlewares here
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup your routes here
const users = require("./routes/users");
const oldresponse = require("./routes/old-response");
const updateSubscriber = require("./routes/updateSubscriber");
const getNotification = require("./routes/getNotification");

// setup your route definations
app.use("/users", users);
app.use("/saveResponse", oldresponse);
app.use("/updateSubscriber", updateSubscriber);
app.use("/getNotification", getNotification);

// Serve static files assets on heroku
app.use(express.static(path.join(__dirname, 'client/build')));

// MongoDB connection string

const MONGO_DB_URI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@ds119692.mlab.com:19692/vpostman`;
mongoose
  .connect(MONGO_DB_URI, { useNewUrlParser: true })
  .then(() => console.log("New connection established"))
  .catch((err) => console.log("Something went wrong" + err));

const port = process.env.PORT || 4000;
// Right before your app.listen(), add this:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
