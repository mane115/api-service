"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const http_1 = require("../util/http");
const http = new http_1.default('http://127.0.0.1:3000/api/v1/collection');
describe('collection', () => {
    describe('get list', () => {
        it('response code should return 0', async () => {
            let result = await http.get('/list/1');
            assert.equal(0, result.code);
        });
        it('next page code should resturn 0', async () => {
            let result = await http.get('/list/2');
            assert.equal(0, result.code);
        });
    });
    describe('create collection', () => {
        let body = {
            name: '服务器用户中心2',
            host: '120.76.198.235',
            base_url: '/api/v1'
        };
        let id;
        it('response code should return 0', async () => {
            let result = await http.post('/', body);
            id = result.result._id;
            assert.equal(0, result.code);
        });
        it('collection should create', async () => {
            let result = await http.get('/list/1?limit=999');
            let test = false;
            result.result.forEach(collection => {
                if (collection._id === id) {
                    test = true;
                }
            });
            assert.equal(true, test);
        });
        it('collection info api should return 0', async () => {
            let result = await http.get(`/${id}`);
            assert.equal(0, result.code);
        });
    });
});
