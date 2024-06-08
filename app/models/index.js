const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.NEON_DB_PSQL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
  });
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

module.exports = db;