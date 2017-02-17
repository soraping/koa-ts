/**
 * 日志中间件
 */
'use strict';
import * as Koa from 'koa';
import * as bunyan from 'bunyan';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import config from '../config';

const log_path = config.get('root') + config.get("log")['log_path'];
//生成日志目录
mkdirp.sync(log_path);

//判断日志对象是否存在
const obj:any = {};
if( !obj.log ) {
    obj.log = bunyan.createLogger({
        name: config.get("log")['log_name'],
        serializers: {
            req: reqSerializer,
            res: bunyan.stdSerializers.res,
            err: bunyan.stdSerializers.err
        },
        streams: [
            {
                level: 'info',
                stream: process.stdout
            },
            {
                type: 'rotating-file',
                level: 'error',
                path: log_path + config.get("log")['log_name'] + '-' +'error.log',
                period: '1d',   // daily rotation
                count: 7        // keep 7 back copies
            }
    
        ]
    });
}

//req序列化
function reqSerializer(ctx: Koa.Context) {
    return {
        method: ctx.method,
        url: ctx.url,
        headers: ctx.headers,
        ip: ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips
    };
}

/**
 * 设置日志子进程，封装req
 */
function logChild(ctx: Koa.Context){
    let log = obj.log;
    return log.child({req: ctx});
}

export default logChild;
//export let logger = logChild;
//export let koaLogger = Logger;