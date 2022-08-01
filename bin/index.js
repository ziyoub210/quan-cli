#!/usr/bin/env node
const path = require('path');
const execa = require('execa');
const modulePath = path.resolve(__dirname, '../lib/index.ts');
try {
  execa.commandSync('ts-node ' + modulePath, {
    stdio: 'inherit',
  });
} catch (e) {
  process.exit(1);
}
