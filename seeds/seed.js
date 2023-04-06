const sequelize = require("../config/connection");
const { User, Idea } = require("../models");

const userData = require("./userData.json");
const ideaData = require("./ideaData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const idea of ideaData) {
    await Idea.create({
      ...idea,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
