'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.pack = void 0;
const utils_1 = require('../utils');
const packJson = require('../../package');
utils_1.log.debug('package', JSON.stringify(packJson));
exports.pack = packJson;
