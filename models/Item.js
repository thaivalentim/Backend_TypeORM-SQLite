const { EntitySchema } = require("typeorm");

const Item = new EntitySchema({
    name: "Item",
    tableName: "items",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        userId: {
            type: "int",
        },
        title: {
            type: "varchar",
        },
        description: {
            type: "text",
            nullable: true,
        },
        status: {
            type: "varchar",
            default: "active",
        },
        createdAt: {
            type: "datetime",
            createDate: true,
        },
        updatedAt: {
            type: "datetime",
            updateDate: true,
        },
    },
});

module.exports = { Item };