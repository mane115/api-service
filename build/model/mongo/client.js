"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../../common/const");
let init = function (mongoose) {
    let client = new mongoose.Schema({
        client_id: String,
        client_secret: String,
        status: {
            type: Number,
            default: const_1.status.client.active
        },
        create_at: {
            type: Date,
            default: new Date
        },
        update_at: {
            type: Date,
            default: new Date
        }
    });
    client.index({
        client_id: 1
    });
    mongoose.model('clients', client);
};
exports.default = init;
