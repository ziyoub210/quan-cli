'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const commander_1 = require('commander');
const semver_1 = __importDefault(require('semver'));
const minimist_1 = __importDefault(require('minimist'));
const utils_1 = require('./utils');
const config_1 = require('./config');
const actions_1 = require('./actions');
class Cli {
  constructor() {
    this.program = commander_1.program;
    this.init();
  }
  async init() {
    this.checkEnv();
    await this.checkCli();
    this.registerCommand();
  }
  checkEnv() {
    const args = (0, minimist_1.default)(process.argv.slice(2));
    if (args.debug || args.d) {
      (0, utils_1.setLogLevel)('debug');
    }
  }
  async checkCli() {
    const currentVersion = config_1.pack.version;
    let lastVersion;
    try {
      lastVersion = await utils_1.NpmUtil.getLatestVersion('cyq-cli-template-vue3');
    } catch (e) {
      lastVersion = '0.0.0';
    }
    if (semver_1.default.lt(currentVersion, lastVersion)) {
      utils_1.log.info('tip', `quan-cli最新版本${lastVersion} 当前版本${currentVersion}`);
      utils_1.log.info('tip', `使用npm install quan-cli 更新`);
    }
    utils_1.log.debug('quan-cli当前版本', currentVersion);
    utils_1.log.debug('quan-cli最新版本', lastVersion);
  }
  registerCommand() {
    this.program
      .name(config_1.pack.name)
      .version(config_1.pack.version)
      .description(`quan-cli version：${config_1.pack.version}`);
    this.program.option('-d, --debug', '开启debug模式（打印信息）');
    this.program
      .command('init [type]')
      .description('quan-cli 初始化项目')
      .option('-p, --packagePath <packagePath>', '指定init包的路径')
      .option('-f, --force', '覆盖当前项目')
      .option('-o, --origin <origin>', '指定初始化使用的npm源')
      .action((str, option) => {
        utils_1.log.debug('输入参数', option);
        new actions_1.InitAction(option);
      });
    this.program.parse();
  }
}
new Cli();
