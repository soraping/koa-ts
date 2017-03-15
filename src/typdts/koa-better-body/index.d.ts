declare module "koa-better-body" {
    import * as Koa from 'koa';
    interface Options {
        fields?: boolean | string;
        files?: boolean | string;
        multipart?: boolean;
        textLimit?: string;
        formLimit?: string;
        urlencodedLimit?: string;
        jsonLimit?: string;
        bufferLimit?: string;
        jsonStrict?: string;
        detectJSON?: string;
        strict?: boolean;
        onerror?: (err: Error, ctx: Koa.Context) => void;
        extendTypes?: object;
        IncomingForm?: any;
        handler?: any;
        querystring?: object;
        qs?: object;
        delimiter?: string;
        sep?: string;
        buffer?: boolean;
    }
    function betterBody(options?: Options): Koa.Middleware;
    namespace betterBody {}
    export = betterBody;
}