"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird = require("bluebird");
const fs = require("fs");
const log4js = require("log4js");
const _ = require("lodash");
const logger = log4js.getLogger('common');
const fsP = bluebird.promisifyAll(fs);
exports.fs = fsP;
const initFolder = async function (floder) {
    //fs.exists asynchronous callback have not err parameter!! so callback throw a error 
    let result = fsP.existsSync(`${__dirname}/${floder}`);
    if (result) {
        return console.log(`floder ${floder} exist`);
    }
    else {
        await fsP.mkdirAsync(`${__dirname}/${floder}`);
        return console.log(`floder ${floder} not exist and created now`);
    }
};
exports.initFolder = initFolder;
const handleResponse = async function (ctx, next) {
    try {
        logger.trace(`${ctx.method} ${ctx.url}`);
        await next();
        if (ctx.body) {
            return;
        }
        let response = {
            code: 0,
            message: 'operation success'
        };
        if (ctx.result && ctx.result.result) {
            response.result = ctx.result.result;
        }
        else if (ctx.result) {
            response.result = ctx.result;
        }
        ctx.body = response;
    }
    catch (err) {
        ctx.body = err;
    }
};
exports.handleResponse = handleResponse;
const parseJson = function (str) {
    try {
        str = JSON.parse(str);
    }
    finally {
        return str;
    }
};
exports.parseJson = parseJson;
const parse = function (sth) {
    if (_.isNull(sth)) {
        return 'null';
    }
    else if (_.isUndefined(sth)) {
        return 'undefined';
    }
    let type = typeof sth;
    if (type === 'object' && _.isArray(sth)) {
        type = parseArray(sth);
    }
    else if (type === 'object') {
        type = parseObject(sth);
    }
    return type;
};
exports.parse = parse;
const parseArray = function (arr) {
    if (!_.isArray(arr)) {
        throw new Error('type error');
    }
    let parseObj = arr[0];
    let type = parse(parseObj);
    return [type];
};
const parseObject = function (obj) {
    if (typeof obj !== 'object') {
        throw new Error('type error');
    }
    let objType = {};
    for (let key in obj) {
        let type = parse(obj[key]);
        objType[key] = type;
    }
    return objType;
};
