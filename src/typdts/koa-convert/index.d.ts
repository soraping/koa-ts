/**
 * koa-convert转d.ts
 */
declare module "koa-convert" {
    import * as Koa from "koa";
    interface  Middleware {
        (context: any, next?: () => Promise<void>): Promise<any>;
    }
    function convert(middleware?: Middleware):{ (ctx: Koa.Context, next?: () => any): any };
    namespace convert {}
    export = convert;
}



