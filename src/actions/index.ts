import fs from 'fs';
import inquirer from 'inquirer';
import { log, isEmptyDir } from '../utils';
export interface initCommand {
  packagePath?: string;
  force?: boolean;
}

class Action {
  static action: Action = new Action();
  cwdPath: string = process.cwd();
  private constructor() {}
  async initAction(option: initCommand) {
    log.debug('工作路径', this.cwdPath);
    const basePath = option.packagePath || this.cwdPath;
    log.debug('创建目录', basePath);
    if (fs.existsSync(basePath)) {
      const isEmpty = isEmptyDir(basePath);
      if (!isEmpty) {
        // const answer = await inquirer.prompt();
      }
    } else {
      log.error('error', '路径不存在，请重试！');
      process.exit(1);
    }
  }
}

export default Action.action;
