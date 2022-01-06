"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Channel", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        ownerId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: true,
        }
    });
};
//# sourceMappingURL=channel.js.map