import fs from 'fs';
export const isEmptyDir = (path: string) => {
  let fileList = fs.readdirSync(path);
  fileList = fileList.filter((file) => ['node_modules', '.git', '.DS_Store'].indexOf(file) < 0);
  if (fileList && fileList.length > 0) {
    return false;
  } else {
    return true;
  }
};
