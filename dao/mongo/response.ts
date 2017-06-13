import DaoInterface from '../';
import * as mongo from '../../model/mongo';
import mongoDao from './';
class ResponseDao extends mongoDao {
    constructor() {
        super('responses')
    }
    findById(id: string) {
        return mongo.responses.findById(id).populate('api');
    };
}

export default ResponseDao;
export {
    ResponseDao
}