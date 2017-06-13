"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("../../model/mongo");
const _ = require("lodash");
class MongoDao {
    constructor(model) {
        this.model = model;
    }
    findById(id) {
        return mongo[this.model].findById(id);
    }
    find(condition, option) {
        if (option && !_.isEmpty(option)) {
            return mongo[this.model].findOne(condition, option);
        }
        else {
            return mongo[this.model].findOne(condition);
        }
    }
    updateById(id, update, option) {
        update.update_at = Date.now();
        if (option && !_.isEmpty(option)) {
            return mongo[this.model].findByIdAndUpdate(id, update, option);
        }
        else {
            return mongo[this.model].findByIdAndUpdate(id, update);
        }
    }
    create(doc, option) {
        if (option && !_.isEmpty(option)) {
            return mongo[this.model].create(doc, option);
        }
        else {
            return mongo[this.model].create(doc);
        }
    }
    updateByCondition(condition, update, option) {
        update.update_at = Date.now();
        if (option && !_.isEmpty(option)) {
            return mongo[this.model].findOneAndUpdate(condition, update, option);
        }
        else {
            return mongo[this.model].findOneAndUpdate(condition, update);
        }
    }
    findList(condition, page = 1, limit, sortBy = 'create_at', sortType = "desc") {
        let offset = (page - 1) * limit;
        let sort = {};
        sort[sortBy] = sortType === 'desc' ? -1 : 1;
        return mongo[this.model].find(condition).sort(sort).skip(offset).limit(limit);
    }
}
exports.MongoDao = MongoDao;
exports.default = MongoDao;
