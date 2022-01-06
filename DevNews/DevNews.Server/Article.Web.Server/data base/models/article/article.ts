import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("Article", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shortDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        ownerType: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    })
}