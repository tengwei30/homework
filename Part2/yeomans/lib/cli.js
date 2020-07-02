#!/usr/bin/env node
'use strict';
const meow = require('meow');
const yeomans = require('./');

const cli = meow(`
Usage
  $ yeomans [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ yeomans
  unicorns
  $ yeomans rainbows
  unicorns & rainbows
`);
