'use strict';
import { IRouterContext }from 'koa-router';
import {router, required, convert, log} from '../middleware/router';

class TestController {

    static prefix:string = '/test';

    @router({
        'method': 'get',
        'path': '/haha'
    })
    @required({
        'query': ['username','age']
    })
    @log
    async testFun (ctx: IRouterContext): Promise<void> {
        ctx.body = ctx.query;
    }

}