const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            type: "varchar",
            unique: true,
        },
        password: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            unique: true,
        },
        createdAt: {
            type: "datetime",
            createDate: true,
        },
    },
});

module.exports = { User };