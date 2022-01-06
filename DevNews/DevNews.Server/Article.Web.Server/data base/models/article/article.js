"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Article", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
            primaryKey: true
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        shortDescription: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        },
        ownerId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: true
        },
        ownerType: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    });
};
//# sourceMappingURL=article.js.map