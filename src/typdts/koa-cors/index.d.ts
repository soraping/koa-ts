/**
 * koa-cors
 */
declare module "koa-cors" {
    import * as Koa from "koa";

    interface Option {
        method?: string,
        expose?: any,
        maxAge?: number,
        headers?: any,
        origin?: boolean | string,
        credentials?: boolean | string
    }
    
    function cors(option?: Option):{ (ctx: Koa.Context, next?: () => any): any };
    namespace cors {}
    export = cors;

}