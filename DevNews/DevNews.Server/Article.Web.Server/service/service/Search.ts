import { Op } from "sequelize";
import sequelize from "../../data base/context";
import { exception, success } from "../../model/api";
import Base from "../base/Base";
import IBase from "../base/IBase";
import ISearch from "../rule/ISearch";

export default class Search implements ISearch {

    private readonly _groupBase: IBase;

    private readonly _channelBase: IBase;

    private readonly _articleBase: IBase;

    constructor() {
        this._groupBase = new Base(sequelize, "Group")
        this._channelBase = new Base(sequelize, "Channel")
        this._articleBase = new Base(sequelize, "Article")
    }

    async search(q: string) {
        try {
            let channels = await this._channelBase.getAll({
                where: {
                    [Op.or]: {
                        name: {
                            [Op.like]: `%${q}%`
                        },
                        link: {
                            [Op.like]: `%${q}%`
                        }
                    }
                }
            })
            let groups = await this._groupBase.getAll({
                where: {
                    [Op.or]: {
                        name: {
                            [Op.like]: `%${q}%`
                        },
                        title: {
                            [Op.like]: `%${q}%`
                        }
                    }
                }
            })
            let articles = await this._articleBase.getAll({
                where: {
                    [Op.or]: {
                        title: {
                            [Op.like]: `%${q}%`
                        },
                        shortDescription: {
                            [Op.like]: `%${q}%`
                        },
                        tags: {
                            [Op.like]: `%${q}%`
                        },
                        text: {
                            [Op.like]: `%${q}%`
                        }
                    }
                }
            })
            return success('Search', '', {
                channels,
                groups,
                articles
            })
        } catch (e) {
            return exception(e.message)
        }
    }

}