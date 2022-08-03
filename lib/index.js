'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const commander_1 = require('commander');
const minimist_1 = __importDefault(require('minimist'));
const utils_1 = require('./utils');
const config_1 = require('./config');
const actions_1 = require('./actions');
const args = (0, minimist_1.default)(process.argv.slice(2));
if (args.debug || args.d) {
  (0, utils_1.setLogLevel)('debug');
}
commander_1.program
  .name(config_1.pack.name)
  .version(config_1.pack.version)
  .description(`quan-cli version：${config_1.pack.version}`);
commander_1.program.option('-d, --debug', '开启debug模式（打印信息）');
commander_1.program
  .command('init [type]')
  .description('quan-cli 初始化项目')
  .option('-p, --packagePath <packagePath>', '指定init包的路径')
  .option('-f, --force', '覆盖当前项目')
  .option('-o, --origin <origin>', '指定初始化使用的npm源')
  .action((str, option) => {
    utils_1.log.debug('输入参数', option);
    new actions_1.InitAction(option);
  });
commander_1.program.parse();
