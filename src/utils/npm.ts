import { log } from './log';
import axios from 'axios';
export class NpmUtil {
  // 获取 registry 信息
  static getNpmRegistry(isOriginal = false): string {
    return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org';
  }
  //获取npm最新版本号
  static async getLatestVersion(packageName: string, origin: string = NpmUtil.getNpmRegistry(true)) {
    log.debug('链接' + origin + '/' + packageName);
    const { data } = await axios({
      method: 'get',
      url: origin + '/' + packageName,
    });

    const version = data['dist-tags'].latest;
    return version;
  }
  //获取npm包在文件中的名字
  static getPackageDirName(packageName: string, version: string): string {
    return '_' + packageName + '@' + version + '@' + packageName;
  }
}
