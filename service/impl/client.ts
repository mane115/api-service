import * as Interface from '../client';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import Dao from '../../dao';
import MongoDao from '../../dao/mongo';
const dao = new MongoDao('clients');
abstract class AbstractClient {
    protected id: string;
    protected db: Dao
}
class AdminClientBasic extends AbstractClient implements Interface.Refresh, Interface.FindById {
    constructor(id: string) {
        super();
        this.id = id;
    }
    refresh() {
        let update = {
            client_secret: uuid.v4()
        };
        return this.db.updateById(this.id, update)
    };
    findById() {
        return this.db.findById(this.id);
    }
}
class AdminClientToCreateBasic extends AbstractClient implements Interface.Create {
    create() {
        let client = {
            client_id: uuid.v1(),
            client_secret: uuid.v4(),
        };
        return this.db.create(client);
    }
}
class ClientBasic extends AbstractClient implements Interface.Verify {
    private client_id: string;
    constructor(client_id) {
        super()
    }
    async verify(clientSecret) {
        let condition = {
            client_id: this.client_id
        };
        var secretInDb = await this.db.find(condition);
        if (secretInDb === clientSecret) {
            return true;
        } else {
            return false
        }
    }
}
class AdminClient extends AdminClientBasic {
    constructor(id: string) {
        super(id);
        this.db = dao
    }
}
class AdminClientToCreate extends AdminClientToCreateBasic {
    constructor() {
        super();
        this.db = dao
    }
}
class Client extends ClientBasic {
    constructor(client_id) {
        super(client_id);
        this.db = dao
    }
}
export {
    AdminClient,
    AdminClientToCreate,
    Client
}