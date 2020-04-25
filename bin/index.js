#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const main = require('../lib/index');

const optionDefinitions = [
    { name: 'token-bot', alias: 't', type: String },
    { name: 'id-chat', alias: 'i', type: String}
];

const argsCL = commandLineArgs(optionDefinitions, {camelCase: true});

console.log('run report');
main.report(argsCL);