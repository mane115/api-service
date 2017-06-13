var rq = require('request-promise');
var _ = require('lodash');
interface HttpOption {
    uri: string,
    method: string,
    headers?: any,
    body?: any
}
abstract class HttpBase {
    baseUrl: string
    protected abstract request(option: HttpOption): Promise<any>
    abstract get(url, headers?): Promise<any>
    abstract post(url: string, data?: any, headers?: any): Promise<any>
    abstract put(url: string, data?: any, headers?: any): Promise<any>
    abstract del(url: string, data?: any, headers?: any): Promise<any>
}

class Http extends HttpBase {
    constructor(public baseUrl: string) {
        super()
    };
    async request(option) {
        var result = await rq(option);
        if (typeof result === 'string') {
            result = JSON.parse(result);
        }
        return result;
    };
    get(url, headers?) {
        var option: HttpOption = {
            uri: `${this.baseUrl}${url}`,
            method: 'GET',
            headers: {}
        }
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        };
        option.headers['content-type'] = 'application/json';
        return this.request(option)
    }
    post(url, data?, headers?) {
        var option: HttpOption = {
            uri: `${this.baseUrl}${url}`,
            method: 'POST',
            headers: {}
        }
        if (!_.isEmpty(data)) {
            option.body = JSON.stringify(data);
        }
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        }
        option.headers['content-type'] = 'application/json';
        return this.request(option)
    }
    put(url, data?, headers?) {
        var option: HttpOption = {
            uri: `${this.baseUrl}${url}`,
            method: 'PUT',
            headers: {}
        }
        if (!_.isEmpty(data)) {
            option.body = JSON.stringify(data);
        }
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        };
        option.headers['content-type'] = 'application/json';
        return this.request(option)
    }
    del(url, data?, headers?) {
        var option: HttpOption = {
            uri: `${this.baseUrl}${url}`,
            method: 'DELETE',
            headers: {}
        }
        if (!_.isEmpty(data)) {
            option.body = JSON.stringify(data);
        }
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        }
        option.headers['content-type'] = 'application/json';
        return this.request(option)
    }
};

export default Http
