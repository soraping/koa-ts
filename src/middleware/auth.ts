/**
 * 权限
 */
'use strict';
import config from '../config';
const jwt = require('jsonwebtoken');

/**
 * 生成token
 * 
 * @param {any} id 用户id
 * @returns 
 */
export function signToken(id: string){
    return jwt.sign({_id: id}, config.get('session').secrets, {'expiresIn': '1d' });
}