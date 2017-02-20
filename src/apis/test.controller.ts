'use strict';
import { IRouterContext }from 'koa-router';
import {router, required, prefix, convert, log} from '../middleware/router';

@prefix('hello')
class TestController {

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