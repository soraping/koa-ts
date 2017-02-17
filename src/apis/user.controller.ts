'use strict'
import * as Mongoose from "mongoose";
import { IRouterContext }from 'koa-router';
import {router, required, convert, log} from '../middleware/router';
const UserModel = Mongoose.model('User');

//中间件测试
async function someFun (ctx: IRouterContext, next: any) {
    console.log('convert function');
    await next();
}

class UserController {

    //router prefix
    //static prefix:string = '/user';

    //http://localhost:8083/user/findOne/zhangsan
    @router({
        method: 'get',
        path: '/user/findOne/:username'
    })
    @required({params: 'username'})
    @convert(someFun)
    @log
    async getUserOne (ctx: IRouterContext): Promise<void> {
        let user = await UserModel.findOne({username: ctx.params.username});
        ctx.body = user;
    }

    //http://localhost:8083/user/list
    @router({
        method: 'get',
        path: '/user/list'
    })
    @convert(someFun)
    @log
    async getUserList (ctx: IRouterContext): Promise<void> {
        let userList = await UserModel.find();
        ctx.body = userList;
    }
    
    //http://localhost:8083/user/register?username=zhangsan&&password=15&&email=soraping@163.com
    @router({
        method: 'post',
        path: '/user/register'
    })
    @log
    async saveUser (ctx: IRouterContext): Promise<void> {
        let _user = ctx.request.body;
        //实例化一个新的用户模型
        let newUser = new UserModel(_user);
        //存储
        const user = await newUser.save();
        ctx.body = user;
    }

    @router({
        method: 'post',
        path: '/user/login'
    })
    @log
    async loginUser (ctx: IRouterContext): Promise<void> {
        let _user = ctx.request.body;
    }

}

export default UserController;