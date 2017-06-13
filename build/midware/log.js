"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const getLogger = function (type) {
    var logger = log4js.getLogger(type);
    return async (ctx, next) => {
        ctx.logger = logger;
        await next();
    };
};
exports.getLogger = getLogger;
exports.default = getLogger;
