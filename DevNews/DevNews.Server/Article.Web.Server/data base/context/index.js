"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const setup_1 = require("./setup");
const sequelize = new sequelize_1.Sequelize("ArticleDb", "fteam", "1G14ijWA", {
    host: "localhost",
    dialect: "mssql",
    benchmark: true
});
const modelDefines = [
    require("../models/article"),
    require("../models/articleGroup"),
    require("../models/group")
];
for (const modelDefine of modelDefines)
    modelDefine(sequelize);
(0, setup_1.default)(sequelize);
sequelize.sync({ force: true });
exports.default = sequelize;
//# sourceMappingURL=index.js.map