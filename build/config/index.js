"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_1 = require("./dev");
const production_1 = require("./production");
let config = process.env.NODE_ENV === 'production' ? production_1.default : dev_1.default;
exports.default = config;
