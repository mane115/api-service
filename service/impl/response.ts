import * as Interface from '../response';
import Dao from '../../dao';
import MongoDao from '../../dao/mongo';
const responseDao = new MongoDao('responses');
class AbstartResponse implements Interface.Base {
    response: string;
    response_type: string;
    protected api_id: string;
    protected dao: Dao
}

class ResponseBase extends AbstartResponse implements Interface.SaveBehavior {
    constructor(id: string) {
        super();
        this.api_id = id
    }
    save() {
        let update: any = {};
        if (this.response) update.response = this.response;
        if (this.response_type) update.response_type = this.response_type;
        let option = {
            upsert: true
        };
        let condition = {
            api: this.api_id
        };
        return this.dao.updateByCondition(condition, update, option);
    }
}
class Response extends ResponseBase {
    constructor(id: string) {
        super(id);
        this.dao = responseDao;
    }
}
export {
    Response
}