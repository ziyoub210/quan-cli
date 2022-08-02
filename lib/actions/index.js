'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = __importDefault(require('fs'));
const utils_1 = require('../utils');
class Action {
  constructor() {
    this.cwdPath = process.cwd();
  }
  async initAction(option) {
    utils_1.log.debug('工作路径', this.cwdPath);
    const basePath = option.packagePath || this.cwdPath;
    utils_1.log.debug('创建目录', basePath);
    if (fs_1.default.existsSync(basePath)) {
      console.log('路径存在');
      console.log((0, utils_1.isEmptyDir)(basePath));
      // const answer = await inquirer({
      // type: 'confirm',
      // message: '当前文件夹不为空，是否继续创建项目？',
      // defaultValue: false,
      // });
    } else {
      utils_1.log.error('error', '路径不存在，请重试！');
      process.exit(1);
    }
  }
}
Action.action = new Action();
exports.default = Action.action;
