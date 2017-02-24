/**
 * koa-router会对koa ctx对象进行参数追加
 * 这段代码对interface追加一个params字段
 */
import * as Koa from "koa";

declare module "koa" {
    interface Context {
        params: any; //koa-router
    }
}