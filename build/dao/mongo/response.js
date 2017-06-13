"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("../../model/mongo");
const _1 = require("./");
class ResponseDao extends _1.default {
    constructor() {
        super('responses');
    }
    findById(id) {
        return mongo.responses.findById(id).populate('api');
    }
    ;
}
exports.ResponseDao = ResponseDao;
exports.default = ResponseDao;
