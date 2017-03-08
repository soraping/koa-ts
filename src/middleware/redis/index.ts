/**
 * 连接redis
 */
import * as redis from 'koa-redis';
import config from '../../config';

export default redis(config.get('redis')[config.get('env')]).client;
