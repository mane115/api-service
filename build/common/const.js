"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clientStatus;
(function (clientStatus) {
    clientStatus[clientStatus["active"] = 0] = "active";
    clientStatus[clientStatus["ban"] = 1] = "ban";
})(clientStatus || (clientStatus = {}));
var apiStatus;
(function (apiStatus) {
    apiStatus[apiStatus["active"] = 0] = "active";
})(apiStatus || (apiStatus = {}));
var apiType;
(function (apiType) {
    apiType[apiType["base"] = 0] = "base";
})(apiType || (apiType = {}));
exports.type = {
    api: apiType
};
exports.status = {
    client: clientStatus,
    api: apiStatus
};
exports.limit = {
    collection: 10
};
exports.http_protocol = 'http://';
