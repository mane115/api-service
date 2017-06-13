"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../service/impl/client");
let createClient = async function (ctx, next) {
    let client = new client_1.AdminClientToCreate();
};
exports.createClient = createClient;
