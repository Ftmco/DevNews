"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyExtraSetup(sequelize) {
    const { Group, Article, ArticleGroups } = sequelize.models;
    Group.hasMany(Group);
    Group.belongsTo(Group);
    Article.hasMany(ArticleGroups);
    ArticleGroups.belongsTo(Article);
    Group.hasMany(ArticleGroups);
    ArticleGroups.belongsTo(Group);
}
exports.default = applyExtraSetup;
//# sourceMappingURL=setup.js.map