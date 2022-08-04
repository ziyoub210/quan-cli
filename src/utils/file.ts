import fs from 'fs';
export class FileUtil {
  static isEmptyDir = (path: string) => {
    let fileList = fs.readdirSync(path);
    fileList = fileList.filter((file) => ['node_modules', 'src', 'tsconfig.json', 'package.json',  '.git', '.DS_Store'].includes(file));
    if (fileList && fileList.length > 0) {
      return false;
    } else {
      return true;
    }
  };
}
