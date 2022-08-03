'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sleep = exports.loading = void 0;
const cli_spinner_1 = require('cli-spinner');
const loading = (msg, spinnerString = '|/-\\') => {
  const spinner = new cli_spinner_1.Spinner(`${msg}.. %s`);
  spinner.setSpinnerString(spinnerString);
  spinner.start();
  return spinner;
};
exports.loading = loading;
const sleep = async (time = 0) => {
  await new Promise((resolve) => {
    let timer = setTimeout(() => {
      resolve(undefined);
      clearTimeout(timer);
    }, time);
  });
};
exports.sleep = sleep;
