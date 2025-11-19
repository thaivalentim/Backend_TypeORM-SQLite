const { DataSource } = require("typeorm");
const { User } = require("../models/User");
const { Hero } = require("../models/Hero");

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "heroes.sqlite",
    synchronize: true,
    entities: [User, Hero],
});

module.exports = { AppDataSource };