import { Sequelize } from 'sequelize'
import applyExtraSetup from './setup';

const sequelize = new Sequelize("ArticleDb", "fteam", "1G14ijWA", {
    host: "localhost",
    dialect: "mssql",
    benchmark: true
})

const modelDefines = [
    require("../models/article"),
    require("../models/articleGroup"),
    require("../models/group")
];

for (const modelDefine of modelDefines)
    modelDefine(sequelize)

applyExtraSetup(sequelize)

sequelize.sync({ force: true })

export default sequelize