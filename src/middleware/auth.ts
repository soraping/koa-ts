/**
 * 权限
 */
'use strict';
import * as Koa from 'koa'; 
import config from '../config';
import redisStorage from './redis';
const jwt = require('jsonwebtoken');

/**
 * 生成token
 * todo 存储token,过期自动清除,或者用于主动退出登录后拦截旧token登陆的问题
 * 
 * @param {string} userId 用户id
 * @returns 
 */
export function signToken(userId: string){
    let jwtConfig = config.get('jwt');
    let token = jwt.sign({userId: userId}, jwtConfig.secret, {'expiresIn': jwtConfig.time });
    // todo token存储 {userId: token}
    redisStorage.set(userId, token);
    return token;
}

/**
 * token 校验
 * 判断redis中是否存在token
 * @export
 * @param {Koa.Context} ctx 
 * @param {*} user 
 * @param {string} token 
 */
export async function verifyToken(ctx: Koa.Context, user: any, token: string){

    let userId = user.userId;
    try{
        let vtoken = await redisStorage.get(userId);
        //需要对token的时效性和token的正确性做校验
        if(token != vtoken){
            throw("Invalid token token")
        }else{
            return Promise.resolve(false);
        }
    }catch(e){
        ctx.throw(401, 'Invalid token, please restart')
    }
    
}

/**
 * 清除redis记录
 * @param ctx 
 */
export async function clearToken(ctx: Koa.Context, next: any){
    let jwtConfig = config.get('jwt');
    let _user = ctx.state[jwtConfig.key];
    //清除token
    redisStorage.del(_user['userId']);
    await next();
}

/**
 * 刷新token在redis中存储时间
 * @param token
 */
export async function expireToken(token: string, userId: string){
    let jwtConfig = config.get('jwt');
    await redisStorage.set(userId, token);
}