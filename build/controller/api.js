"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../service/impl/api");
const response_1 = require("../service/impl/response");
const util_1 = require("../util");
const createApi = async function (ctx, next) {
    let body = ctx.request.body;
    let api = new api_1.ApiCreateDao();
    api.collectionId = body.collection_id;
    api.url = body.url;
    api.method = body.method;
    api.headers = body.headers;
    api.name = body.name;
    api.body = body.body;
    let apiInfo = await api.create();
    ctx.result = apiInfo;
    ctx.logger.info(`新增api _id:${apiInfo._id}`);
};
exports.createApi = createApi;
const testApi = async function (ctx, next) {
    let body = ctx.request.body;
    let api = new api_1.Api(ctx.params.id);
    try {
        let apiResponse = await api.request();
        let responseType = util_1.parse(apiResponse);
        let responseStr = JSON.stringify(apiResponse);
        let responseTypeStr = JSON.stringify(responseType);
        let response = new response_1.Response(ctx.params.id);
        response.response = responseStr;
        response.response_type = responseTypeStr;
        await response.save();
        ctx.result = {
            response: apiResponse,
            type: responseType
        };
    }
    catch (err) {
        ctx.logger.error(`api接口调试错误 _id:${ctx.params.id}`);
        if (err.error) {
            throw err;
        }
        ctx.result = err;
    }
};
exports.testApi = testApi;
const getInfo = async function (ctx, next) {
    let api = new api_1.ApiDao(ctx.params.id);
    ctx.result = await api.findById();
};
exports.getInfo = getInfo;
