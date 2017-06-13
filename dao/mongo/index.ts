import DaoInterface from '../';
import * as mongo from '../../model/mongo';
import * as _ from 'lodash';
class MongoDao implements DaoInterface {
    private model: string;
    constructor(model) {
        this.model = model;
    }
    findById(id) {
        return mongo[this.model].findById(id)
    }
    find(condition, option?) {
        if (option && !_.isEmpty(option)) {
            return mongo[this.model].findOne(condition, option);
        } else {
            return mongo[this.model].findOne(condition);
        }
    }
    updateById(id, update, option?) {
        update.update_at = Date.now();
        if (option && !_.isEmpty(option)) {
            return mongo[this.model].findByIdAndUpdate(id, update, option);
        } else {
            return mongo[this.model].findByIdAndUpdate(id, update);
        }
    }
    create(doc, option?) {
        if (option && !_.isEmpty(option)) {
            return mongo[this.model].create(doc, option);
        } else {
            return mongo[this.model].create(doc);
        }
    }
    updateByCondition(condition, update, option?) {
        update.update_at = Date.now();
        if (option && !_.isEmpty(option)) {
            return mongo[this.model].findOneAndUpdate(condition, update, option);
        } else {
            return mongo[this.model].findOneAndUpdate(condition, update);
        }
    }
    findList(condition, page: number = 1, limit: number, sortBy = 'create_at', sortType = "desc") {
        let offset = (page - 1) * limit;
        let sort = {};
        sort[sortBy] = sortType === 'desc' ? -1 : 1;
        return mongo[this.model].find(condition).sort(sort).skip(offset).limit(limit);
    }
}
export {
    MongoDao
}
export default MongoDao