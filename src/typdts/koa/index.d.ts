/**
 * koa-router会对koa ctx对象进行参数追加
 * 这段代码对interface追加一个params字段
 */
import * as Koa from "koa";
import * as compose from 'koa-compose'

declare module "koa" {
    interface Context {
        ip: any;
        params: any; //koa-router 追加了params属性
        otherArgs: any;  // other params 额外追加的参数，用来向下传递变量
    }
}