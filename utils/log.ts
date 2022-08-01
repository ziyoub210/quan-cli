import log from 'npmlog';

log.level = process.env.LOG_LEVEL || 'info';
log.heading = 'quan-cli';

log.addLevel('success', 2000, { fg: 'green', bold: true });
log.addLevel('debug', 2000, { fg: 'blue', bg: 'black' });

export default log;
