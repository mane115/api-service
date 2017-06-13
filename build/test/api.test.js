"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const http_1 = require("../util/http");
const http = new http_1.default('http://127.0.0.1:3000/api/v1/endpoint');
const collectionHttp = new http_1.default('http://127.0.0.1:3000/api/v1/collection');
let collectionId;
let apiId;
describe('api', () => {
    describe('create api', () => {
        let apiLength;
        it('get collection id', async () => {
            let result = await collectionHttp.get('/list/1');
            assert.equal(0, result.code);
            collectionId = result.result[0]._id;
        });
        it('get collection info', async () => {
            let result = await collectionHttp.get(`/${collectionId}`);
            assert.equal(0, result.code);
            apiLength = result.result.apis.length;
        });
        it('create api', async () => {
            let api = {
                "url": "/signin",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "app_id": "101",
                    "platform": "web"
                },
                "collection_id": collectionId,
                "body": {
                    "credential": "+86-13823044664",
                    "password": "e10adc3949ba59abbe56e057f20f883e"
                },
                "name": "测试"
            };
            let result = await http.post('/', api);
            assert.equal(0, result.code);
            apiId = result.result._id;
        });
        it('get collection info', async () => {
            let result = await collectionHttp.get(`/${collectionId}`);
            assert.equal(result.result.apis.length, apiLength + 1);
        });
    });
    describe('test api', () => {
        it('response should equal 0', async () => {
            let result = await http.post(`/${apiId}`);
            assert.equal(0, result.code);
        });
    });
    describe('get api info', async () => {
        it('response should equal 0', async () => {
            let result = await http.get(`/${apiId}`);
            assert.equal(0, result.code);
        });
    });
});
