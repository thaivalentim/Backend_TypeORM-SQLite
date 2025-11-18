const { DataSource } = require("typeorm");
const { User } = require("../models/User");
const { Item } = require("../models/Item");

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "users.sqlite",
    synchronize: true,
    entities: [User, Item],
});

module.exports = { AppDataSource };