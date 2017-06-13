import { CollectionCreateDao, CollectionDao, Collections } from '../service/impl/collection';
const createCollection = async function (ctx, next) {
    let body = ctx.request.body;
    let collection = new CollectionCreateDao();
    collection.base_url = body.base_url;
    collection.host = body.host;
    collection.name = body.name;
    ctx.result = await collection.create();
};
const getList = async function (ctx, next) {
    let page = +ctx.params.page;
    let limit = +ctx.query.limit;
    let collections = new Collections();
    let condition = {};
    ctx.result = await collections.findList(condition, page, limit);
};
const getInfo = async function (ctx, next) {
    let collectionId = ctx.params.id;
    let collection = new CollectionDao(collectionId);
    ctx.result = await collection.findById();
};
export {
    createCollection,
    getList,
    getInfo
}