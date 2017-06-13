"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../../dao/mongo");
const responseDao = new mongo_1.default('responses');
class AbstartResponse {
}
class ResponseBase extends AbstartResponse {
    constructor(id) {
        super();
        this.api_id = id;
    }
    save() {
        let update = {};
        if (this.response)
            update.response = this.response;
        if (this.response_type)
            update.response_type = this.response_type;
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
    constructor(id) {
        super(id);
        this.dao = responseDao;
    }
}
exports.Response = Response;
