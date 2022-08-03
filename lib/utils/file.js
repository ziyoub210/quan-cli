'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FileUtil = void 0;
const fs_1 = __importDefault(require('fs'));
class FileUtil {}
exports.FileUtil = FileUtil;
FileUtil.isEmptyDir = (path) => {
  let fileList = fs_1.default.readdirSync(path);
  fileList = fileList.filter((file) => ['node_modules', '.git', '.DS_Store'].includes(file));
  if (fileList && fileList.length > 0) {
    return false;
  } else {
    return true;
  }
};
