"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("../service/impl/collection");
const createCollection = async function (ctx, next) {
    let body = ctx.request.body;
    let collection = new collection_1.CollectionCreateDao();
    collection.base_url = body.base_url;
    collection.host = body.host;
    collection.name = body.name;
    ctx.result = await collection.create();
};
exports.createCollection = createCollection;
const getList = async function (ctx, next) {
    let page = +ctx.params.page;
    let limit = +ctx.query.limit;
    let collections = new collection_1.Collections();
    let condition = {};
    ctx.result = await collections.findList(condition, page, limit);
};
exports.getList = getList;
const getInfo = async function (ctx, next) {
    let collectionId = ctx.params.id;
    let collection = new collection_1.CollectionDao(collectionId);
    ctx.result = await collection.findById();
};
exports.getInfo = getInfo;
