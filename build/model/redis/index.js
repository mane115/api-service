"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird = require("bluebird");
const Redis = require("redis");
const config_1 = require("../../config");
bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);
//redis
let base = Redis.createClient(config_1.default.database.redis.base.port, config_1.default.database.redis.base.host);
exports.base = base;
let db2 = Redis.createClient(config_1.default.database.redis.db2.port, config_1.default.database.redis.db2.host);
exports.db2 = db2;
const init = async function (redisConfig, redis) {
    if (redisConfig.pwd) {
        await redis.authAsync(redisConfig.pwd);
    }
    if (redisConfig.library) {
        await redis.selectAsync(redisConfig.library);
    }
    redis.on('error', err => {
        console.log(err);
        throw err;
    });
    return console.log(`init redis success ${redisConfig.host}:${redisConfig.port} db:${redisConfig.library}`);
};
exports.init = init;
