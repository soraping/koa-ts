'use strict';
import * as Koa from 'koa';
import * as convert from 'koa-convert';
import * as BodyParser from 'koa-bodyparser';
import * as Json from 'koa-json';
import config from './config';
import logger from './middleware/logger';
import koaError from './middleware/error';
import {Route} from './middleware/router/Route';
import * as Database from './middleware/db';
import * as cors from 'koa-cors';

const app = new Koa();
const router = new Route(app);

//连接mongo
Database.init(config.get('mongo')['development']);

app.use(convert(Json()));
app.use(BodyParser());
app.use(koaError);

//跨域
app.use(convert(cors({
    origin: true,
    credentials: true
})));

//注册路由
router.registerRouters(`${__dirname}/apis`, config.get('jwt').secret);

//错误
app.on('error', (err:any, ctx:Koa.Context) => {
    logger(ctx).error(err.message);
});

app.listen(config.get('port'),()=>{
    console.log(`koa2+typescript服务启动，监听${config.get('port')}端口`);
});