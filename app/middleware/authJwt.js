const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

isOfficial = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
      if (user.role === "official") {
      next();
      return;
      }
      res.status(403).send({
        message: "Require Official Role!"
      });
  });
};


isMember = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
      if (user.role === "member") {
      next();
      return;
      }
      res.status(403).send({
        message: "Require Member Role!"
      });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isOfficial: isOfficial,
  isMember: isMember
};
module.exports = authJwt;
