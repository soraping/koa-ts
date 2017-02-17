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
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

export const UserModel = Mongoose.model<IUser>('User', UserSchema);