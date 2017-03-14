/**
 * koa-jwt
 * todo 需要koa-unless模块加进去
 */
declare module 'koa-jwt' {
    import * as Koa from 'koa';
    interface Middleware extends Koa.Middleware {
        unless: any;
    }
    function jwt(Options: jwt.Options): Middleware;
    namespace jwt {
        interface Options {
            secret: string | Buffer;
            key?: string;
            getToken?: (opts: jwt.Options) => string;
            passthrough?: boolean;
            cookie?: string;
            debug?: boolean;
            isRevoked?: any;
        }
    }
    export = jwt;

}