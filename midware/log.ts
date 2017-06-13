import * as log4js from 'log4js';

const getLogger = function (type) {
    var logger = log4js.getLogger(type);
    return async (ctx, next) => {
        ctx.logger = logger;
        await next();
    }
}
export default getLogger;
export {
    getLogger
}