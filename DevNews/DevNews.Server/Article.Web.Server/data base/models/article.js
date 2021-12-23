"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Article", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    });
};
//# sourceMappingURL=article.js.map