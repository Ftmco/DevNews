import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("Group", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
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