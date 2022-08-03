import { Spinner } from 'cli-spinner';

export const loading = (msg: string, spinnerString: string = '|/-\\') => {
  const spinner = new Spinner(`${msg}.. %s`);
  spinner.setSpinnerString(spinnerString);
  spinner.start();
  return spinner;
};

export const sleep = async (time: number = 0) => {
  await new Promise((resolve) => {
    let timer = setTimeout(() => {
      resolve(undefined);
      clearTimeout(timer);
    }, time);
  });
};
