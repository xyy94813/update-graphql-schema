#!/usr/bin/env node
const program = require('commander');
const path = require('path');

const { version } = require('../package.json');
const updateGraphqlSchema = require('../core/updateGraphqlSchema');

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
  .option('-t, --type [value]', 'Schema type `json` or `graphql`. Note: It will always be `json` if output file extension is `json`.')
  .action(run)
  .parse(process.argv);

async function run(options, command) {
  const localConf = options.config ? require(options.config) : {};
  const endPoint = options.point || localConf.point;
  const output = options.output || path.resolve(process.cwd(), localConf.output) || resolveArgPath('schema.json');
  const schemaType = options.type || localConf.type || 'graphql';
  const requestHeaders = {
    ...(localConf.headers || {}),
    ...options.headers,
  };

  try {
    console.group(`updating schema`);
    console.log(`update schema from ${endPoint}`);
    console.log(`output to ${output}`);
    await updateGraphqlSchema({
      endPoint,
      output,
      schemaType,
      headers: requestHeaders,
    });
    console.log('update schema successful');
  } catch (error) {
    console.error(error.message);
  } finally {
    console.groupEnd();
  }
}
