"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const adminCtr = require("../controller/admin");
const router = new Router();
router.post('/client', adminCtr.createClient);
exports.default = router;
