/**
 * koa-jwt 转 d.ts文件
 */
declare module "koa-jwt" {
    import * as Koa from "koa";
    import * as _JWT from 'jsonwebtoken';
    interface Option {
        key?: string,
        getToken?: Function,
        cookies?: string,
        debug?: boolean,
        secret: string,
        passthrough?: boolean
    }
    export function koaJwt(opt: Option): { (ctx: Koa.Context, next?: () => any): any };
    export var jwt: {
        sign: Function,
        verify: Function,
        decode: Function
    }
}