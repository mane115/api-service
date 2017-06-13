"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const http = require("request-promise");
const mongo_1 = require("../../dao/mongo");
const api_1 = require("../../dao/mongo/api");
const const_1 = require("../../common/const");
const util_1 = require("../../util");
const apiDao = new api_1.default();
const queueDao = new mongo_1.default('queues');
const responseDao = new mongo_1.default('responses');
class AbstractApiBase {
    constructor(dao, id) {
        this.dao = dao;
        this.id = id;
    }
}
class AbstractApiByGroupBase extends AbstractApiBase {
}
class UpdateBehavior {
    constructor(api) {
        this.api = api;
    }
    update(update, option) {
        if (!this.api.id) {
            throw new Error('require id');
        }
        return this.api.dao.updateById(this.api.id, update, option);
    }
    save(option) {
        if (!this.api.id) {
            throw new Error('require id');
        }
        let update = {};
        if (this.api.url) {
            update.url = this.api.url;
        }
        if (this.api.method) {
            update.method = this.api.method;
        }
        if (this.api.headers) {
            update.headers = this.api.headers;
        }
        return this.api.dao.updateById(this.api.id, update, option);
    }
}
class FindBehavior {
    constructor(api, responseDao) {
        this.api = api;
        this.responseDao = responseDao;
    }
    async findById() {
        if (!this.api.id) {
            throw new Error('require id');
        }
        let condition = {
            api: this.api.id
        };
        let filter = {
            response: 1,
            response_type: 1,
            _id: 0
        };
        let infos = await Promise.all([
            this.api.dao.findById(this.api.id),
            this.responseDao.find(condition, filter)
        ]);
        let result = {
            api_info: infos[0].toJSON(),
            response_info: infos[1].toJSON(),
        };
        result.collection_info = result.api_info.collection_info;
        delete result.api_info.collection_info;
        delete result.api_info.__v;
        delete result.collection_info.__v;
        if (result.api_info.body) {
            result.api_info.body = util_1.parseJson(result.api_info.body);
        }
        if (result.api_info.headers) {
            result.api_info.headers = util_1.parseJson(result.api_info.headers);
        }
        if (result.response_info.response) {
            result.response_info.response = util_1.parseJson(result.response_info.response);
        }
        if (result.response_info.response_type) {
            result.response_info.response_type = util_1.parseJson(result.response_info.response_type);
        }
        if (result.response_info.headers) {
            result.response_info.headers = util_1.parseJson(result.response_info.headers);
        }
        return result;
    }
}
class CreateBehavior {
    constructor(api, queueDao) {
        this.api = api;
        this.queueDao = queueDao;
    }
    async create() {
        if (!this.api.collectionId)
            throw new Error('collection id require');
        if (!this.api.url || !this.api.method || !this.api.collectionId || !this.api.name)
            throw new Error('require params');
        let api = {
            url: this.api.url,
            method: this.api.method.toLocaleLowerCase(),
            collection_info: this.api.collectionId,
            name: this.api.name
        };
        if (api.method !== 'get' && _.isPlainObject(this.api.body)) {
            api.body = JSON.stringify(this.api.body);
        }
        if (_.isPlainObject(this.api.headers)) {
            api.headers = JSON.stringify(this.api.headers);
        }
        let apiInfo = await this.api.dao.create(api);
        let queue = {
            api_info: apiInfo._id
        };
        await this.queueDao.create(queue);
        return apiInfo;
    }
}
class RequestBehavior {
    constructor(api) {
        this.api = api;
    }
    async request() {
        let condition = {
            api_id: this.api.id
        };
        let infos = await Promise.all([
            this.api.dao.findById(this.api.id)
        ]);
        let appInfo = infos[0];
        let url = appInfo.collection_info.host + appInfo.collection_info.base_url + appInfo.url;
        if (url.indexOf(const_1.http_protocol) === -1) {
            url = const_1.http_protocol + url;
        }
        let httpOption = {
            method: appInfo.method,
            url
        };
        if (appInfo.headers) {
            httpOption.headers = JSON.parse(appInfo.headers);
        }
        if (appInfo.method !== 'get' && appInfo.body) {
            httpOption.body = appInfo.body;
        }
        let response = await http(httpOption);
        if (typeof response === 'string') {
            response = util_1.parseJson(response);
        }
        return response;
    }
}
class ApiDaoBase extends AbstractApiBase {
    constructor(dao, id) {
        super(dao, id);
    }
    update(update, option) {
        return this.updateBehavior.update(update, option);
    }
    save(option) {
        return this.updateBehavior.save(option);
    }
    findById() {
        return this.findBehavior.findById();
    }
}
class ApiCreateDaoBase extends AbstractApiBase {
    constructor(dao) {
        super(dao);
    }
    async create() {
        return this.createBehavior.create();
    }
}
class ApiBase extends AbstractApiBase {
    constructor(dao, id) {
        super(dao, id);
    }
    async request() {
        return this.requestBehavior.request();
    }
}
class ApiCreateDao extends ApiCreateDaoBase {
    constructor() {
        super(apiDao);
        this.createBehavior = new CreateBehavior(this, queueDao);
    }
}
exports.ApiCreateDao = ApiCreateDao;
class ApiDao extends ApiDaoBase {
    constructor(id) {
        super(apiDao, id);
        this.updateBehavior = new UpdateBehavior(this);
        this.findBehavior = new FindBehavior(this, responseDao);
    }
}
exports.ApiDao = ApiDao;
class Api extends ApiBase {
    constructor(id) {
        super(apiDao, id);
        this.requestBehavior = new RequestBehavior(this);
    }
}
exports.Api = Api;
