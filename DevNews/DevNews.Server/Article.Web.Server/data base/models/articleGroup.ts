import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("ArticleGroups", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        }
    })
}