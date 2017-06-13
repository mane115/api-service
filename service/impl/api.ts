import * as Interface from '../api';
import * as _ from 'lodash';
import * as http from 'request-promise';
import Dao from '../../dao';
import MongoDao from '../../dao/mongo';
import MongoApiDao from '../../dao/mongo/api';
import { http_protocol } from '../../common/const';
import { parseJson } from '../../util';
const apiDao = new MongoApiDao();
const queueDao = new MongoDao('queues');
const responseDao = new MongoDao('responses');
abstract class AbstractApiBase implements Interface.Base {
    url: string;
    method: string;
    headers: any;
    body: any;
    name: string;
    constructor(readonly dao: Dao, readonly id?: string) { }
}
abstract class AbstractApiByGroupBase extends AbstractApiBase implements Interface.GroupInfo {
    collection: string;
    baseUrl: string;
    host: string
}
class UpdateBehavior implements Interface.UpdateBehavior {
    constructor(readonly api: AbstractApiBase) { }
    update(update, option?) {
        if (!this.api.id) {
            throw new Error('require id');
        }
        return this.api.dao.updateById(this.api.id, update, option)
    }
    save(option?) {
        if (!this.api.id) {
            throw new Error('require id');
        }
        let update: any = {};
        if (this.api.url) {
            update.url = this.api.url;
        }
        if (this.api.method) {
            update.method = this.api.method;
        }
        if (this.api.headers) {
            update.headers = this.api.headers;
        }
        if (this.api.name) {
            update.name = this.api.name
        }
        return this.api.dao.updateById(this.api.id, update, option)
    }
}
class FindBehavior implements Interface.GetSingleBehavior {
    constructor(readonly api: AbstractApiBase, readonly responseDao: Dao) { }
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
        let result: any = {
            api_info: infos[0].toJSON(),
            response_info: infos[1].toJSON(),
        };
        result.collection_info = result.api_info.collection_info;
        delete result.api_info.collection_info;
        delete result.api_info.__v;
        delete result.collection_info.__v;
        if (result.api_info.body) {
            result.api_info.body = parseJson(result.api_info.body)
        }
        if (result.api_info.headers) {
            result.api_info.headers = parseJson(result.api_info.headers)
        }
        if (result.response_info.response) {
            result.response_info.response = parseJson(result.response_info.response)
        }
        if (result.response_info.response_type) {
            result.response_info.response_type = parseJson(result.response_info.response_type)
        }
        if (result.response_info.headers) {
            result.response_info.headers = parseJson(result.response_info.headers)
        }
        return result;
    }
}
class CreateBehavior implements Interface.CreateBehavior {
    constructor(readonly api: ApiCreateDaoBase, readonly queueDao: Dao) { }
    async create() {
        if (!this.api.collectionId) throw new Error('collection id require');
        if (!this.api.url || !this.api.method || !this.api.collectionId || !this.api.name) throw new Error('require params');
        let api: any = {
            url: this.api.url,
            method: this.api.method.toLocaleLowerCase(),
            collection_info: this.api.collectionId,
            name: this.api.name
        };
        if (api.method !== 'get' && _.isPlainObject(this.api.body)) {
            api.body = JSON.stringify(this.api.body)
        }
        if (_.isPlainObject(this.api.headers)) {
            api.headers = JSON.stringify(this.api.headers)
        }
        let apiInfo = await this.api.dao.create(api);
        let queue = {
            api_info: apiInfo._id
        };
        await this.queueDao.create(queue);
        return apiInfo
    }
}
class RequestBehavior implements Interface.RequestBehavior {
    constructor(readonly api: AbstractApiBase) { }
    async request() {
        let condition = {
            api_id: this.api.id
        };
        let infos = await Promise.all([
            this.api.dao.findById(this.api.id)
        ]);
        let appInfo = infos[0];
        let url = appInfo.collection_info.host + appInfo.collection_info.base_url + appInfo.url;
        if (url.indexOf(http_protocol) === -1) {
            url = http_protocol + url;
        }
        let httpOption: any = {
            method: appInfo.method,
            url
        };
        if (appInfo.headers) {
            httpOption.headers = JSON.parse(appInfo.headers)
        }
        if (appInfo.method !== 'get' && appInfo.body) {
            httpOption.body = appInfo.body;
        }
        let response = await http(httpOption);
        if (typeof response === 'string') {
            response = parseJson(response);
        }
        return response;
    }
}
class ApiDaoBase extends AbstractApiBase {
    protected updateBehavior: UpdateBehavior;
    protected findBehavior: FindBehavior;
    constructor(dao: Dao, id: string) {
        super(dao, id)
    }
    update(update, option?) {
        return this.updateBehavior.update(update, option)
    }
    save(option?) {
        return this.updateBehavior.save(option);
    }
    findById() {
        return this.findBehavior.findById();
    }
}
class ApiCreateDaoBase extends AbstractApiBase implements Interface.CreateBehavior {
    collectionId: string;
    protected createBehavior: CreateBehavior;
    constructor(dao: Dao) {
        super(dao);
    }
    async create() {
        return this.createBehavior.create()
    }
}
class ApiBase extends AbstractApiBase implements Interface.RequestBehavior {
    requestBehavior: RequestBehavior;
    constructor(dao, id) {
        super(dao, id);
    }
    async request() {
        return this.requestBehavior.request()
    }
}
class ApiCreateDao extends ApiCreateDaoBase {
    constructor() {
        super(apiDao);
        this.createBehavior = new CreateBehavior(this, queueDao);
    }
}
class ApiDao extends ApiDaoBase {
    constructor(id) {
        super(apiDao, id);
        this.updateBehavior = new UpdateBehavior(this);
        this.findBehavior = new FindBehavior(this, responseDao);
    }
}
class Api extends ApiBase {
    constructor(id) {
        super(apiDao, id);
        this.requestBehavior = new RequestBehavior(this);
    }
}
export {
    ApiCreateDao,
    ApiDao,
    Api
}