import * as Interface from '../collection';
import * as _ from 'lodash';
import Dao from '../../dao';
import MongoDao from '../../dao/mongo';
import MongoApiDao from '../../dao/mongo/api';
import { limit as Limit } from '../../common/const';
const collectionDao = new MongoDao('collections');
const apiDao = new MongoApiDao();
abstract class AbstractCollection implements Interface.Base {
    name: string;
    host: string;
    base_url: string;
    constructor(readonly id?) { }
}
abstract class Behavior {
    constructor(readonly dao, readonly collection) { }
}
class UpdateBehavior extends Behavior implements Interface.UpdateBehavior {
    update;
    save() {
        let update: any = {};
        let col = this.collection
        if (col.name) {
            update.name = col.name;
        }
        if (col.host) {
            update.host = col.host;
        }
        if (col.base_url) {
            update.base_url = col.base_url;
        }
        return this.dao.updateById(this.collection.id, update)
    }
}
class GetSingleBehavior extends Behavior implements Interface.GetSingleBehavior {
    protected apiDao: Dao;
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
        }
    }
}
class GetListBehavior extends Behavior implements Interface.GetListBehavior {
    findList(condition, page: number, limit) {
        limit = limit ? limit : Limit.collection;
        return this.dao.findList(condition, page, limit)
    }
}
class CreateBehavior extends Behavior implements Interface.CreateBehavior {
    create() {
        if (!this.collection.name || !this.collection.host || !this.collection.base_url) {
            throw new Error('params require');
        }
        let collection = {
            name: this.collection.name,
            host: this.collection.host,
            base_url: this.collection.base_url
        };
        return this.dao.create(collection)
    }
}
class CollectionDaoBase extends AbstractCollection {
    protected updateBehavior: UpdateBehavior;
    protected getSingleBehavior: GetSingleBehavior;
    constructor(id) {
        super(id);
    }
    findById() {
        return this.getSingleBehavior.findById();
    };
    save() {
        return this.updateBehavior.save();
    };
    async findInfo() {

    }
    update
}
class BashCollectionsBase extends AbstractCollection {
    protected getListBehavior: GetListBehavior;
    findList(condition, page: number, limit) {
        return this.getListBehavior.findList(condition, page, limit)
    };
}
class CollectionCreateDaoBase extends AbstractCollection {
    protected createBehavior: CreateBehavior;
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
class CollectionCreateDao extends CollectionCreateDaoBase {
    constructor() {
        super();
        this.createBehavior = new CreateBehavior(collectionDao, this);
    }
}
class Collections extends BashCollectionsBase {
    constructor() {
        super();
        this.getListBehavior = new GetListBehavior(collectionDao, this);
    }
}
export {
    CollectionDao,
    CollectionCreateDao,
    Collections
}