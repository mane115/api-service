import * as bluebird from 'bluebird';
import * as Redis from 'redis';
import config from '../../config'
bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);
//redis
let base = Redis.createClient(config.database.redis.base.port, config.database.redis.base.host);
let db2 = Redis.createClient(config.database.redis.db2.port, config.database.redis.db2.host);

const init = async function (redisConfig, redis): Promise<void> {
    if (redisConfig.pwd) {
        await redis.authAsync(redisConfig.pwd)
    }
    if (redisConfig.library) {
        await redis.selectAsync(redisConfig.library)
    }
    redis.on('error', err => {
        console.log(err);
        throw err;
    });
    return console.log(`init redis success ${redisConfig.host}:${redisConfig.port} db:${redisConfig.library}`)
}
export {
    base,
    db2,
    init
}