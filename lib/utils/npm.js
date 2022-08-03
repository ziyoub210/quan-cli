'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.NpmUtil = void 0;
const log_1 = require('./log');
const axios_1 = __importDefault(require('axios'));
class NpmUtil {
  // 获取 registry 信息
  static getNpmRegistry(isOriginal = false) {
    return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org';
  }
  //获取npm最新版本号
  static async getLatestVersion(packageName, origin = NpmUtil.getNpmRegistry(false)) {
    log_1.log.debug('链接' + origin + '/' + packageName);
    const { data } = await (0, axios_1.default)({
      method: 'get',
      url: origin + '/' + packageName,
    });
    const version = data['dist-tags'].latest;
    return version;
  }
}
exports.NpmUtil = NpmUtil;
