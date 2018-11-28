#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const { Headers } = require('node-fetch');

const { version } = require('../package.json');
const updateGraphqlSchema = require('../index');

const resolveArgPath = val => path.resolve(process.cwd(), val);
const resolveArgHeaders = val => {
  const conf = new Map();
  val.split('&').forEach(keyVal => {
    const [key, val] = keyVal.split('=');
    conf.set(key.toLocaleUpperCase, val);
  });
  return {
    ...conf,
  };
};

program
  .version(version, '-v, --version')
  .usage('[options] <file ...>')
  .option('-c, --config <file ...>', 'Config files path', resolveArgPath)
  .option('-h, --headers <items>', 'Request Headers', resolveArgHeaders)
  .option(
    '-o, --output <file ...>',
    'Output Path, Default: `${process.cwd()}/schema.json`',
    resolveArgPath
  )
  .option('-p, --point [value]', 'Endpoint url')
  .parse(process.argv);

const confInTheFile = program.config ? require(program.config) : {};

function getEndPoint() {
  return program.point || confInTheFile.point;
}

function getOutputPath() {
  return (
    program.output || confInTheFile.output || `${process.cwd()}/schema.json`
  );
}

const { headers: headersInConfFile = {} } = confInTheFile;
function getHeaders() {
  return {
    ...headersInConfFile,
    ...program.headers,
  };
}

async function run() {
  try {
    const endPoint = getEndPoint();
    const output = getOutputPath();
    console.group(`updating schema`);
    console.log(`update schema from ${endPoint}`);
    console.log(`output to ${output}`);
    await updateGraphqlSchema({
      endPoint,
      output,
      headers: getHeaders(),
    });
    console.log('update schema successful');
  } catch (error) {
    console.error(error.message);
  } finally {
    console.groupEnd();
  }
}

run();
