/**
 * 错误处理
 */
'use strict';
import * as Koa from 'koa';
async function errorMiddleware(ctx: Koa.Context, next: any){
    try{
        await next();
    }catch(err){
        ctx.status = err.status || 500;
        ctx.app.emit('error', err, ctx);
    }
}

export default errorMiddleware;