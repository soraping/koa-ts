'use strict';
import * as Koa from 'koa';
import * as convert from 'koa-convert';
import * as betterBody from 'koa-better-body';
import * as Json from 'koa-json';
import config from './config';
import logger from './middleware/logger';
import koaError from './middleware/error';
import {Route} from './middleware/router/Route';
import * as Database from './middleware/db';
import * as kcors from 'kcors';
import * as compress from 'koa-compress';


const app = new Koa();
const router = new Route(app);

//连接mongo
Database.init(config.get('mongo')[config.get('env')]);

app.use(Json());
app.use(convert(betterBody({
  fields: "body"
})));
app.use(koaError);

//跨域
app.use(kcors());

// gzip
app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

//注册路由
router.registerRouters(`${__dirname}/apis`, {'secret': config.get('jwt').secret,"key": config.get('jwt').key});

//错误
app.on('error', (err:any, ctx:Koa.Context) => {
    logger(ctx).error(err.message);
});

app.listen(config.get('port'),()=>{
    console.log(`koa2+typescript服务启动，监听${config.get('port')}端口`);
});