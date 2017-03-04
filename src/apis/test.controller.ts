'use strict';
import * as Koa from 'koa';
import {router, required, prefix, convert, log} from '../middleware/router';

@prefix('hello')
class TestController {

    @router({
        'method': 'get',
        'path': '/haha',
        'unless': true
    })
    @required({
        'query': ['username','age']
    })
    @log
    async testFun (ctx: Koa.Context): Promise<void> {
        ctx.body = ctx.query;
    }

}