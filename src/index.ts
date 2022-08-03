import { program, Command } from 'commander';
import semver from 'semver';
import minimist from 'minimist';
import { log, setLogLevel, NpmUtil } from './utils';
import { pack } from './config';
import { initCommand, InitAction } from './actions';

class Cli {
  program: Command = program;
  constructor() {
    this.init();
  }
  async init() {
    this.checkEnv();
    await this.checkCli();
    this.registerCommand();
  }
  checkEnv() {
    const args = minimist(process.argv.slice(2));
    if (args.debug || args.d) {
      setLogLevel('debug');
    }
  }
  async checkCli() {
    const currentVersion = pack.version;
    let lastVersion;
    try {
      lastVersion = await NpmUtil.getLatestVersion('cyq-cli-template-vue3');
    } catch (e) {
      lastVersion = '0.0.0';
    }
    if (semver.lt(currentVersion, lastVersion)) {
      log.info('tip', `quan-cli最新版本${lastVersion} 当前版本${currentVersion}`);
      log.info('tip', `使用npm install quan-cli 更新`);
    }
    log.debug('quan-cli当前版本', currentVersion);
    log.debug('quan-cli最新版本', lastVersion);
  }
  registerCommand() {
    this.program.name(pack.name).version(pack.version).description(`quan-cli version：${pack.version}`);
    this.program.option('-d, --debug', '开启debug模式（打印信息）');
    this.program
      .command('init [type]')
      .description('quan-cli 初始化项目')
      .option('-p, --packagePath <packagePath>', '指定init包的路径')
      .option('-f, --force', '覆盖当前项目')
      .option('-o, --origin <origin>', '指定初始化使用的npm源')
      .action((str: string, option: initCommand) => {
        log.debug('输入参数', option);
        new InitAction(option);
      });
    this.program.parse();
  }
}

new Cli();
