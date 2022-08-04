import fs from 'fs';
import path from 'path';
//@ts-ignore
import userhome from 'userhome';
import inquirer from 'inquirer';
import fse from 'fs-extra';
import axios from 'axios';
//@ts-ignore
import npminstall from 'npminstall';
import { log, FileUtil, NpmUtil, loading, sleep } from '../utils';
import { paths } from '../config';

export interface initCommand {
  packagePath?: string;
  force?: boolean;
  origin?: string;
}

export interface template {
  id: number;
  name: string;
  store: string;
}

export class InitAction {
  cwdPath: string = process.cwd();
  basePath!: string;
  force: boolean;
  templates!: template[];
  template!: template;
  origin!: string;
  homePath: string = userhome();
  constructor(option: initCommand) {
    this.basePath = option.packagePath || this.cwdPath;
    this.force = option.force || false;
    this.origin = option.origin || NpmUtil.getNpmRegistry(true);
    this.initAction();
  }
  //初始化
  async initAction() {
    log.debug('homePath', this.homePath);
    log.debug('工作路径', this.cwdPath);
    log.debug('要创建的目录', this.basePath);
    //路径不存在
    this.checkPath();
    this.checkForce();
    await this.checkPrompt();
    await this.getTemplate();
    await this.selectTemplate();
    await this.getTemplateVersion();
    await this.install();
  }
  //检查路径是否可用
  checkPath() {
    if (!fs.existsSync(this.basePath)) {
      log.error('error', '路径不存在，请重试！');
      process.exit(1);
    }
  }
  //force清空目录
  checkForce() {
    const isEmpty = FileUtil.isEmptyDir(this.basePath);
    if (!isEmpty && this.force) {
      fse.emptyDirSync(this.basePath);
    }
  }
  //checkPrompt 清空目录
  async checkPrompt() {
    const isEmpty = FileUtil.isEmptyDir(this.basePath);
    if (!isEmpty) {
      const isDelDir = await this.getDelPrompt();
      if (!isDelDir) {
        process.exit(1);
      } else {
        fse.emptyDirSync(this.basePath);
      }
    }
  }
  async getDelPrompt() {
    const { isDelDir } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isDelDir',
        message: `是否清空${this.basePath}。注意（文件无法恢复，请谨慎操作）`,
      },
    ]);
    return isDelDir;
  }
  async getTemplateVersion() {
    return await NpmUtil.getLatestVersion(this.template.store, this.origin);
  }
  async install() {
    const version = await this.getTemplateVersion();
    log.debug(`执行安装:${this.template.store}，版本:${version}`);
    log.debug(path.resolve(this.homePath, paths.ROOT_PATH, paths.TARGET_PATH));
    const loadingStart = loading('正在下载模板...');
    await sleep(1500);
    await npminstall({
      root: path.resolve(this.homePath, paths.ROOT_PATH, paths.TARGET_PATH),
      registry: this.origin,
      pkgs: [{ name: this.template.store, version: version }],
    });
    this.copy(this.template.store, version);
    loadingStart.stop(true);
    log.info('info', '模板下载完成');
  }
  //執行copy
  copy(name: string, version: string) {
    const packageName = NpmUtil.getPackageDirName(name, version);
    const originPath = path.resolve(
      this.homePath,
      paths.ROOT_PATH,
      paths.TARGET_PATH,
      'node_modules',
      packageName,
      'template'
    );
    const targetPath = this.basePath;
    fse.copySync(originPath, targetPath);
    process.exit(1);
  }
  async selectTemplate() {
    const { template } = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: '请选择要下载的模板',
        choices: this.templates.map((item) => item.name),
      },
    ]);
    this.template = this.templates.filter((item) => item.name === template)[0];
  }
  async getTemplate() {

    const {
      data: { data },
    } = await axios({
      method: 'get',
      url: 'http://101.42.154.196/quan-cli/getAllTemplate',
    });
    this.templates = data;
  }
}
