const express = require("express");
const cors = require("cors");
const db = require("./app/v1/models");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// simple route
require('./app/v1/routes/auth.route')(app);
require('./app/v1/routes/user.route')(app);

app.get('./v1/*', function(req, res){
  res.status(404).send({ message: "404" });
});

app.get('./v1/', (req, res) => {
  res.status(200).send({ message: "Nothing to see here." });
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
