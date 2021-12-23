import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("Group", {
        id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 250,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 250,
        },
    })
}