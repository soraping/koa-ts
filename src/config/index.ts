/**
 * 读取配置文件
 */
'use strict';
import * as nconf from 'nconf';
import * as path from 'path';

const obj:any = {};

if(!obj.config){
    obj.config = nconf.argv().env().file({file: 'config.json'});
}
let config = obj.config;
config.set('root', path.join(__dirname, '../'));
config.set('env', process.env.NODE_ENV);

export default config;