'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.InitAction = void 0;
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
//@ts-ignore
const userhome_1 = __importDefault(require('userhome'));
const inquirer_1 = __importDefault(require('inquirer'));
const fs_extra_1 = __importDefault(require('fs-extra'));
//@ts-ignore
const npminstall_1 = __importDefault(require('npminstall'));
const utils_1 = require('../utils');
const config_1 = require('../config');
class InitAction {
  constructor(option) {
    this.cwdPath = process.cwd();
    this.homePath = (0, userhome_1.default)();
    this.basePath = option.packagePath || this.cwdPath;
    this.force = option.force || false;
    this.origin = option.origin || utils_1.NpmUtil.getNpmRegistry(false);
    this.initAction();
  }
  //初始化
  async initAction() {
    utils_1.log.debug('homePath', this.homePath);
    utils_1.log.debug('工作路径', this.cwdPath);
    utils_1.log.debug('要创建的目录', this.basePath);
    //路径不存在
    this.checkPath();
    this.checkForce();
    await this.checkPrompt();
    this.getTemplate();
    await this.getTemplateVersion();
    await this.install();
  }
  //检查路径是否可用
  checkPath() {
    if (!fs_1.default.existsSync(this.basePath)) {
      utils_1.log.error('error', '路径不存在，请重试！');
      process.exit(1);
    }
  }
  //force清空目录
  checkForce() {
    const isEmpty = utils_1.FileUtil.isEmptyDir(this.basePath);
    if (!isEmpty && this.force) {
      fs_extra_1.default.emptyDirSync(this.basePath);
    }
  }
  //checkPrompt 清空目录
  async checkPrompt() {
    const isEmpty = utils_1.FileUtil.isEmptyDir(this.basePath);
    if (!isEmpty) {
      const isDelDir = await this.getDelPrompt();
      if (!isDelDir) {
        process.exit(1);
      } else {
        fs_extra_1.default.emptyDirSync(this.basePath);
      }
    }
  }
  async getDelPrompt() {
    const { isDelDir } = await inquirer_1.default.prompt([
      {
        type: 'confirm',
        name: 'isDelDir',
        message: `是否清空${this.basePath}。注意（文件无法恢复，请谨慎操作）`,
      },
    ]);
    return isDelDir;
  }
  async getTemplateVersion() {
    return await utils_1.NpmUtil.getLatestVersion(this.templates[0].store, this.origin);
  }
  async install() {
    // const version = await this.getTemplateVersion();
    const version = '1.0.0';
    utils_1.log.debug(`执行安装:${this.templates[0].store}，版本:${version}`);
    utils_1.log.debug(path_1.default.resolve(this.homePath, config_1.paths.ROOT_PATH, config_1.paths.TARGET_PATH));
    const loadingStart = (0, utils_1.loading)('正在下载模板...');
    await (0, utils_1.sleep)(1500);
    await (0, npminstall_1.default)({
      root: path_1.default.resolve(this.homePath, config_1.paths.ROOT_PATH, config_1.paths.TARGET_PATH),
      registry: this.origin,
      pkgs: [{ name: this.templates[0].store, version: version }],
    });
    this.copy(this.templates[0].store, version);
    loadingStart.stop(true);
    utils_1.log.info('info', '模板下载完成');
  }
  //執行copy
  copy(name, version) {
    const packageName = '_' + name + '@' + version + '@' + name;
    const originPath = path_1.default.resolve(
      this.homePath,
      config_1.paths.ROOT_PATH,
      config_1.paths.TARGET_PATH,
      'node_modules',
      packageName,
      'template'
    );
    const targetPath = this.basePath;
    fs_extra_1.default.copySync(originPath, targetPath);
    process.exit(1);
  }
  getTemplate() {
    const names = [
      {
        id: 1,
        name: 'vue3+ts标准模板',
        store: 'cyq-cli-template-vue3',
      },
    ];
    this.templates = names;
  }
}
exports.InitAction = InitAction;
