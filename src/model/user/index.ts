'use strict';
import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
    username: string;
    email: string;
    password: string;
};

export const UserSchema = new Mongoose.Schema({
    email: { 
        type: String, 
        //是否校验重复
        unique: true, 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String,
        required: true 
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

export const UserModel = Mongoose.model<IUser>('User', UserSchema);