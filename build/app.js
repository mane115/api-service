"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const log4js = require("log4js");
const bodyParser = require("koa-bodyparser");
const util = require("./util");
const redis = require("./model/redis");
const config_1 = require("./config");
const router_1 = require("./router");
const app = new Koa();
const initDb = async function () {
    return Promise.all([
        redis.init(config_1.default.database.redis.base, redis.base),
        redis.init(config_1.default.database.redis.db2, redis.db2)
    ]);
};
const initLogger = function () {
    log4js.configure(config_1.default.log);
    let logger = log4js.getLogger('common');
    return Promise.resolve();
};
const initMidware = function () {
    app.use(bodyParser()).use(router_1.default.routes()).use(router_1.default.allowedMethods());
};
const initServer = async function () {
    await util.initFolder('temp');
    await initLogger();
    await initDb();
    initMidware();
    app.listen(config_1.default.port, () => {
        console.log(`running on ${config_1.default.port}`);
    });
};
initServer().catch(console.log);
