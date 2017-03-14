/**
 * 连接redis
 */
import * as redis from 'koa-redis';
import config from '../../config';

const redisClient = redis(config.get('redis')[config.get('env')]).client;

redisClient.on('connect', ()=>{
    console.log('redis connect');
})

redisClient.on('error', ()=>{
    console.error('redis server require start');
})

export default redisClient;