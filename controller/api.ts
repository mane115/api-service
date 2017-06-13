import { ApiCreateDao, Api, ApiDao } from '../service/impl/api';
import { Response } from '../service/impl/response';
import { parse } from '../util';
const createApi = async function (ctx, next) {
    let body = ctx.request.body;
    let api = new ApiCreateDao();
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
const testApi = async function (ctx, next) {
    let body = ctx.request.body;
    let api = new Api(ctx.params.id);
    try {
        let apiResponse = await api.request();
        let responseType = parse(apiResponse);
        let responseStr = JSON.stringify(apiResponse);
        let responseTypeStr = JSON.stringify(responseType);
        let response = new Response(ctx.params.id);
        response.response = responseStr;
        response.response_type = responseTypeStr;
        await response.save();
        ctx.result = {
            response: apiResponse,
            type: responseType
        };
    } catch (err) {
        ctx.logger.error(`api接口调试错误 _id:${ctx.params.id}`);
        if (err.error) {
            throw err
        }
        ctx.result = err;
    }
};
const getInfo = async function (ctx, next) {
    let api = new ApiDao(ctx.params.id);
    ctx.result = await api.findById();
};
const updateApi = async function (ctx, next) {
    let body = ctx.request.body;
    let api = new ApiDao(ctx.params.id);
    api.name = body.name;
    api.headers = body.headers;
    api.method = body.method;
    api.body = body.body;
    await api.save();
};
export {
    createApi,
    testApi,
    getInfo,
    updateApi
}