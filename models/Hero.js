const { EntitySchema } = require("typeorm");

const Hero = new EntitySchema({
    name: "Hero",
    tableName: "heroes_team",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        userId: {
            type: "int",
        },
        nome: {
            type: "varchar",
        },
        habilidade: {
            type: "varchar",
        },
        nivel: {
            type: "int",
            default: 1,
        },
        categoria: {
            type: "varchar",
            default: "Herói",
        },
        origem: {
            type: "varchar",
            nullable: true,
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

module.exports = { Hero };