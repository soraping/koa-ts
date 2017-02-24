'use strict'
import * as Mongoose from "mongoose";
import * as Koa from 'koa';
import {router, required, prefix, convert, log} from '../middleware/router';
const UserModel = Mongoose.model('User');

//中间件测试
async function someFun (ctx: Koa.Context, next: any) {
    console.log('convert function');
    await next();
}

@prefix('/user')
class UserController {

    //http://localhost:8083/user/findOne/zhangsan
    @router({
        method: 'get',
        path: '/findOne/:username'
    })
    @required({params: 'username'})
    @convert(someFun)
    @log
    async getUserOne (ctx: Koa.Context): Promise<void> {
        let user = await UserModel.findOne({username: ctx.params.username});
        ctx.body = user;
    }

    //http://localhost:8083/user/list
    @router({
        method: 'get',
        path: '/list'
    })
    @convert(someFun)
    @log
    async getUserList (ctx: Koa.Context): Promise<void> {
        let userList = await UserModel.find();
        ctx.body = userList;
    }
    
    //http://localhost:8083/user/register?username=zhangsan&&password=15&&email=soraping@163.com
    @router({
        method: 'post',
        path: '/register'
    })
    @log
    async saveUser (ctx: Koa.Context): Promise<void> {
        let _user = ctx.request.body;
        //实例化一个新的用户模型
        let newUser = new UserModel(_user);
        //存储
        const user = await newUser.save();
        ctx.body = user;
    }

    @router({
        method: 'post',
        path: '/login'
    })
    @log
    async loginUser (ctx: Koa.Context): Promise<void> {
        let _user = ctx.request.body;
    }

}

export default UserController;