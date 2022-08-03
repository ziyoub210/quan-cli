import { log } from '../utils';
const packJson = require('../../package');

log.debug('package', JSON.stringify(packJson));

export interface Package {
  name: string;
  version: string;
  author: string;
}

export const pack = packJson as Package;
