import * as bluebird from 'bluebird';
import * as fs from 'fs';
import * as log4js from 'log4js';
import * as _ from 'lodash';
import config from '../config';
const logger = log4js.getLogger('common');
const fsP = bluebird.promisifyAll(fs);

const initFolder = async function (floder: string): Promise<void> {
    //fs.exists asynchronous callback have not err parameter!! so callback throw a error 
    let result = fsP.existsSync(`${__dirname}/${floder}`);
    if (result) {
        return console.log(`floder ${floder} exist`);
    } else {
        await fsP.mkdirAsync(`${__dirname}/${floder}`);
        return console.log(`floder ${floder} not exist and created now`)
    }
}
const handleResponse = async function (ctx, next) {
    try {
        logger.trace(`${ctx.method} ${ctx.url}`)
        interface Response {
            code: number,
            message: string,
            result?: any
        }
        await next();
        if (ctx.body) {
            return;
        }
        let response: Response = {
            code: 0,
            message: 'operation success'
        };
        if (ctx.result && ctx.result.result) {
            response.result = ctx.result.result;
        } else if (ctx.result) {
            response.result = ctx.result;
        }
        ctx.body = response;
    } catch (err) {
        ctx.body = err;
    }
};
const parseJson = function (str: string) {
    try {
        str = JSON.parse(str)
    } finally {
        return str
    }
}
const parse = function (sth) {
    if (_.isNull(sth)) {
        return 'null'
    } else if (_.isUndefined(sth)) {
        return 'undefined'
    }
    let type: any = typeof sth;
    if (type === 'object' && _.isArray(sth)) {
        type = parseArray(sth)
    } else if (type === 'object') {
        type = parseObject(sth)
    }
    return type
};
const parseArray = function (arr) {
    if (!_.isArray(arr)) {
        throw new Error('type error')
    }
    let parseObj = arr[0];
    let type = parse(parseObj);
    return [type]
};
const parseObject = function (obj) {
    if (typeof obj !== 'object') {
        throw new Error('type error')
    }
    let objType = {};
    for (let key in obj) {
        let type = parse(obj[key])
        objType[key] = type;
    }
    return objType
}
export {
    initFolder,
    fsP as fs,
    handleResponse,
    parseJson,
    parse
}