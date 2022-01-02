import { FindOptions, UpsertOptions } from "sequelize";


export default interface IBase {
    getAll(where: FindOptions<any>): any;

    getAllEntity(): any;

    findOne(where: FindOptions<any>): any;

    upsert(values: any, options?: UpsertOptions<any>): any;
}