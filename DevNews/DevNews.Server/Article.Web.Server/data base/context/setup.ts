import { Sequelize } from "sequelize";

export default function applyExtraSetup(sequelize: Sequelize) {
    const { Group, Article, ArticleGroups, User, Session } = sequelize.models;

    Group.hasMany(Group);
    Group.belongsTo(Group);

    Article.hasMany(ArticleGroups);
    ArticleGroups.belongsTo(Article)

    Group.hasMany(ArticleGroups)
    ArticleGroups.belongsTo(Group)

    User.hasMany(Session)
    Session.belongsTo(User)

}