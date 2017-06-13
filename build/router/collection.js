"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const collectionCtr = require("../controller/collection");
const router = new Router();
router.post('/', collectionCtr.createCollection);
router.get('/list/:page', collectionCtr.getList);
router.get('/:id', collectionCtr.getInfo);
exports.default = router;
