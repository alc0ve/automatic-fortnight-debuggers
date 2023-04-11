const User = require("./User");
const Idea = require("./Idea");

User.hasMany(Idea, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Idea.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Idea };
