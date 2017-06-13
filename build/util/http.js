"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rq = require('request-promise');
var _ = require('lodash');
class HttpBase {
}
class Http extends HttpBase {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
    }
    ;
    async request(option) {
        var result = await rq(option);
        if (typeof result === 'string') {
            result = JSON.parse(result);
        }
        return result;
    }
    ;
    get(url, headers) {
        var option = {
            uri: `${this.baseUrl}${url}`,
            method: 'GET',
            headers: {}
        };
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        }
        ;
        option.headers['content-type'] = 'application/json';
        return this.request(option);
    }
    post(url, data, headers) {
        var option = {
            uri: `${this.baseUrl}${url}`,
            method: 'POST',
            headers: {}
        };
        if (!_.isEmpty(data)) {
            option.body = JSON.stringify(data);
        }
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        }
        option.headers['content-type'] = 'application/json';
        return this.request(option);
    }
    put(url, data, headers) {
        var option = {
            uri: `${this.baseUrl}${url}`,
            method: 'PUT',
            headers: {}
        };
        if (!_.isEmpty(data)) {
            option.body = JSON.stringify(data);
        }
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        }
        ;
        option.headers['content-type'] = 'application/json';
        return this.request(option);
    }
    del(url, data, headers) {
        var option = {
            uri: `${this.baseUrl}${url}`,
            method: 'DELETE',
            headers: {}
        };
        if (!_.isEmpty(data)) {
            option.body = JSON.stringify(data);
        }
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        }
        option.headers['content-type'] = 'application/json';
        return this.request(option);
    }
}
;
exports.default = Http;
