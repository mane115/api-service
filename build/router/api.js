"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const ctr = require("../controller/api");
const router = new Router();
router.post('/', ctr.createApi);
router.post('/:id', ctr.testApi);
router.get('/:id', ctr.getInfo);
exports.default = router;
