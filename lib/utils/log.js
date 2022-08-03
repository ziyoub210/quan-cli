'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.setLogLevel = exports.log = void 0;
const npmlog_1 = __importDefault(require('npmlog'));
exports.log = npmlog_1.default;
npmlog_1.default.level = process.env.LOG_LEVEL || 'info';
npmlog_1.default.heading = 'quan-cli';
npmlog_1.default.addLevel('success', 2000, { fg: 'green', bold: true });
npmlog_1.default.addLevel('debug', 1000, { fg: 'blue', bg: 'black' });
const setLogLevel = (level) => {
  npmlog_1.default.level = level;
  npmlog_1.default.debug(npmlog_1.default.level + '模式开启');
};
exports.setLogLevel = setLogLevel;
