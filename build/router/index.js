"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const util_1 = require("../util");
const config_1 = require("../config");
const api_1 = require("./api");
const collection_1 = require("./collection");
const log_1 = require("../midware/log");
const router = new Router({ prefix: config_1.default.baseUrl });
router.use('/*', util_1.handleResponse);
router.use('/endpoint', log_1.default('api'), api_1.default.routes(), api_1.default.allowedMethods());
router.use('/collection', log_1.default('collection'), collection_1.default.routes(), collection_1.default.allowedMethods());
exports.default = router;
