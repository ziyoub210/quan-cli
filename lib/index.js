'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const commander_1 = require('commander');
const minimist_1 = __importDefault(require('minimist'));
const index_1 = require('./utils/index');
const package_1 = __importDefault(require('./config/package'));
const actions_1 = __importDefault(require('./actions'));
const args = (0, minimist_1.default)(process.argv.slice(2));
if (args.debug || args.d) {
  (0, index_1.setLogLevel)('debug');
}
commander_1.program
  .name(package_1.default.name)
  .version(package_1.default.version)
  .description(`quan-cli version：${package_1.default.version}`);
commander_1.program.option('-d, --debug', '开启debug模式（打印信息）');
commander_1.program
  .command('init [type]')
  .description('quan-cli 初始化项目')
  .option('-p, --packagePath <packagePath>', '指定init包的路径')
  .option('-f, --force', '覆盖当前项目')
  .action(async (str, option) => {
    index_1.log.debug('输入参数', option);
    await actions_1.default.initAction(option);
  });
commander_1.program.parse();
