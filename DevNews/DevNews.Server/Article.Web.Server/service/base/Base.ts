import { FindOptions, Sequelize, UpsertOptions } from "sequelize";
import IBase from "./IBase";


export default class Base implements IBase {

    private readonly _db: Sequelize;

    private readonly _dbSet: string;

    constructor(sequelize: Sequelize, model: string) {
        this._db = sequelize
        this._dbSet = model
    }

    async getAllEntity() {
        return await this._db.models[this._dbSet].findAll();
    }

    async upsert(values: any, options?: UpsertOptions<any>) {
        return await this._db.models[this._dbSet].upsert(values, options)
    }

    async findOne(where: FindOptions<any>) {
        return await this._db.models[this._dbSet].findOne(where);
    }

    async getAll(where: FindOptions<any>) {
        return await this._db.models[this._dbSet].findAll(where) 
    }

    
}