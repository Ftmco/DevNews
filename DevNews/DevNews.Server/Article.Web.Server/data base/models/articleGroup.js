"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("ArticleGroups", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    });
};
//# sourceMappingURL=articleGroup.js.map