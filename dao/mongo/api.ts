import DaoInterface from '../';
import * as mongo from '../../model/mongo';
import mongoDao from './';
class ApiDao extends mongoDao {
    constructor() {
        super('apis')
    }
    findById(id: string) {
        return mongo.apis.findById(id).populate('collection_info');
    };
    findList(condition, page: number = 1, limit: number, sortBy = 'create_at', sortType = "desc") {
        let sort = {};
        sort[sortBy] = sortType === 'desc' ? -1 : 1;
        return mongo.apis.find(condition).sort(sort)
    }
}

export default ApiDao;
export {
    ApiDao
}