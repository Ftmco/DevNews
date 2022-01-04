"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Group", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
            primaryKey: true
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 250,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 250,
        },
    });
};
//# sourceMappingURL=group.js.map