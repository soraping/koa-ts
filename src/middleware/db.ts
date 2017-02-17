/**
 * mongo配置
 */
'use strict';
import * as Mongoose from "mongoose";
import { IUser, UserModel } from './../model/user/index';

//mongo入参
export interface DbConfig {
    host: string,
    user ?: string,
    pwd ?: string
}

//mongo绑定model
export interface Database {
    userModel: Mongoose.Model<IUser>;
}

//连接mongo
export function init(config: DbConfig): Database {
    //mongo设置promise
    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(config.host);

    let mongoDb = Mongoose.connection;
    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.host}`);
    });
    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.host}`);
    });

    return {
        userModel: UserModel
    }

}