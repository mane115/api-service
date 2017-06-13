"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../../dao/mongo");
const api_1 = require("../../dao/mongo/api");
const const_1 = require("../../common/const");
const collectionDao = new mongo_1.default('collections');
const apiDao = new api_1.default();
class AbstractCollection {
    constructor(id) {
        this.id = id;
    }
}
class Behavior {
    constructor(dao, collection) {
        this.dao = dao;
        this.collection = collection;
    }
}
class UpdateBehavior extends Behavior {
    save() {
        let update = {};
        let col = this.collection;
        if (col.name) {
            update.name = col.name;
        }
        if (col.host) {
            update.host = col.host;
        }
        if (col.base_url) {
            update.base_url = col.base_url;
        }
        return this.dao.updateById(this.collection.id, update);
    }
}
class GetSingleBehavior extends Behavior {
    constructor(dao, apiDao, collection) {
        super(dao, collection);
        this.apiDao = apiDao;
    }
    async findById() {
        let condition = {
            collection_info: this.collection.id
        };
        let infos = await Promise.all([
            this.dao.findById(this.collection.id),
            this.apiDao.findList(condition, 0, 0)
        ]);
        return {
            info: infos[0],
            apis: infos[1]
        };
    }
}
class GetListBehavior extends Behavior {
    findList(condition, page, limit) {
        limit = limit ? limit : const_1.limit.collection;
        return this.dao.findList(condition, page, limit);
    }
}
class CreateBehavior extends Behavior {
    create() {
        if (!this.collection.name || !this.collection.host || !this.collection.base_url) {
            throw new Error('params require');
        }
        let collection = {
            name: this.collection.name,
            host: this.collection.host,
            base_url: this.collection.base_url
        };
        return this.dao.create(collection);
    }
}
class CollectionDaoBase extends AbstractCollection {
    constructor(id) {
        super(id);
    }
    findById() {
        return this.getSingleBehavior.findById();
    }
    ;
    save() {
        return this.updateBehavior.save();
    }
    ;
    async findInfo() {
    }
}
class BashCollectionsBase extends AbstractCollection {
    findList(condition, page, limit) {
        return this.getListBehavior.findList(condition, page, limit);
    }
    ;
}
class CollectionCreateDaoBase extends AbstractCollection {
    create() {
        return this.createBehavior.create();
    }
}
class CollectionDao extends CollectionDaoBase {
    constructor(id) {
        super(id);
        this.updateBehavior = new UpdateBehavior(collectionDao, this);
        this.getSingleBehavior = new GetSingleBehavior(collectionDao, apiDao, this);
    }
}
exports.CollectionDao = CollectionDao;
class CollectionCreateDao extends CollectionCreateDaoBase {
    constructor() {
        super();
        this.createBehavior = new CreateBehavior(collectionDao, this);
    }
}
exports.CollectionCreateDao = CollectionCreateDao;
class Collections extends BashCollectionsBase {
    constructor() {
        super();
        this.getListBehavior = new GetListBehavior(collectionDao, this);
    }
}
exports.Collections = Collections;
