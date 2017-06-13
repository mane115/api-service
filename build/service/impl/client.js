"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const mongo_1 = require("../../dao/mongo");
const dao = new mongo_1.default('clients');
class AbstractClient {
}
class AdminClientBasic extends AbstractClient {
    constructor(id) {
        super();
        this.id = id;
    }
    refresh() {
        let update = {
            client_secret: uuid.v4()
        };
        return this.db.updateById(this.id, update);
    }
    ;
    findById() {
        return this.db.findById(this.id);
    }
}
class AdminClientToCreateBasic extends AbstractClient {
    create() {
        let client = {
            client_id: uuid.v1(),
            client_secret: uuid.v4(),
        };
        return this.db.create(client);
    }
}
class ClientBasic extends AbstractClient {
    constructor(client_id) {
        super();
    }
    async verify(clientSecret) {
        let condition = {
            client_id: this.client_id
        };
        var secretInDb = await this.db.find(condition);
        if (secretInDb === clientSecret) {
            return true;
        }
        else {
            return false;
        }
    }
}
class AdminClient extends AdminClientBasic {
    constructor(id) {
        super(id);
        this.db = dao;
    }
}
exports.AdminClient = AdminClient;
class AdminClientToCreate extends AdminClientToCreateBasic {
    constructor() {
        super();
        this.db = dao;
    }
}
exports.AdminClientToCreate = AdminClientToCreate;
class Client extends ClientBasic {
    constructor(client_id) {
        super(client_id);
        this.db = dao;
    }
}
exports.Client = Client;
