import { log } from '../utils';
const pack = require('../../package');

log.debug('package', JSON.stringify(pack));

export interface Package {
  name: string;
  version: string;
  author: string;
}

export default pack as Package;
