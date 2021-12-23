import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("ArticleGroups", {
        id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    })
}