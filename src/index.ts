import { program } from 'commander';
import minimist from 'minimist';
import { log, setLogLevel } from './utils/index';
import pack from './config/package';
import action, { initCommand } from './actions';

const args = minimist(process.argv.slice(2));
if (args.debug || args.d) {
  setLogLevel('debug');
}

program.name(pack.name).version(pack.version).description(`quan-cli version：${pack.version}`);
program.option('-d, --debug', '开启debug模式（打印信息）');
program
  .command('init [type]')
  .description('quan-cli 初始化项目')
  .option('-p, --packagePath <packagePath>', '指定init包的路径')
  .option('-f, --force', '覆盖当前项目')
  .action(async (str: string, option: initCommand) => {
    log.debug('输入参数', option);
    await action.initAction(option);
  });

program.parse();
