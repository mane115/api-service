"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("../../model/mongo");
const _1 = require("./");
class ApiDao extends _1.default {
    constructor() {
        super('apis');
    }
    findById(id) {
        return mongo.apis.findById(id).populate('collection_info');
    }
    ;
    findList(condition, page = 1, limit, sortBy = 'create_at', sortType = "desc") {
        let sort = {};
        sort[sortBy] = sortType === 'desc' ? -1 : 1;
        return mongo.apis.find(condition).sort(sort);
    }
}
exports.ApiDao = ApiDao;
exports.default = ApiDao;
