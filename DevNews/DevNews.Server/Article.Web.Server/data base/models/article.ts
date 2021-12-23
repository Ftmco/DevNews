import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("Article", {
        id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    })
}