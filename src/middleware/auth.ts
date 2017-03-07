/**
 * 权限
 */
'use strict';
import config from '../config';
//import redisStorage from './redis';
const jwt = require('jsonwebtoken');

/**
 * 生成token
 * todo 存储token,过期自动清除,或者用于主动退出登录后拦截旧token登陆的问题
 * 
 * @param {any} id 用户id
 * @returns 
 */
export function signToken(id: string){
    let jwtConfig = config.get('jwt');
    let token = jwt.sign({_id: id}, jwtConfig.secrets, {'expiresIn': jwtConfig.time });
    // todo token存储

    return token;
}