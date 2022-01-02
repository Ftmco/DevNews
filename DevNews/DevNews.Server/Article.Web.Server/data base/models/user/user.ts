import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        emailActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        phoneActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        activeCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        registerDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}