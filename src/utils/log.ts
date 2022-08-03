import log from 'npmlog';

export type customLogLevels = log.LogLevels | 'success' | 'debug';

log.level = process.env.LOG_LEVEL || 'info';
log.heading = 'quan-cli';

log.addLevel('success', 2000, { fg: 'green', bold: true });
log.addLevel('debug', 1000, { fg: 'blue', bg: 'black' });

const setLogLevel = (level: customLogLevels) => {
  log.level = level;
  log.debug(log.level + '模式开启');
};

export { log, setLogLevel };
