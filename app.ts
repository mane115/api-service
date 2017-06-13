import * as Koa from 'koa';
import * as log4js from 'log4js';
import * as bodyParser from 'koa-bodyparser';
import * as util from './util';
import * as redis from './model/redis';
import * as mongo from './model/mongo';
import config from './config';
import router from './router';
const app = new Koa();

const initDb = async function (): Promise<any[]> {
    return Promise.all([
        redis.init(config.database.redis.base, redis.base),
        redis.init(config.database.redis.db2, redis.db2)
    ])
};

const initLogger = function (): Promise<void> {
    log4js.configure(config.log);
    let logger = log4js.getLogger('common');
    return Promise.resolve();
};
const initMidware = function () {
    app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());
};
const initServer = async function (): Promise<void> {
    await util.initFolder('temp');
    await initLogger();
    await initDb();
    initMidware();
    app.listen(config.port, () => {
        console.log(`running on ${config.port}`)
    })
};

initServer().catch(console.log)