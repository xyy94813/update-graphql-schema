# update-graphql-schema

> A module and cli tool for updating graphql schema from Graphql server

[![CircleCI branch](https://img.shields.io/circleci/project/github/xyy94813/update-graphql-schema/master.svg?style=flat-square)](https://circleci.com/gh/xyy94813/update-graphql-schema)
[![Codecov](https://img.shields.io/codecov/c/github/xyy94813/update-graphql-schema/master.svg?style=flat-square)](https://codecov.io/gh/xyy94813/update-graphql-schema/branch/master)
[![Dependencies](https://img.shields.io/david/xyy94813/update-graphql-schema.svg)](https://david-dm.org/xyy94813/update-graphql-schema)
[![DevDependencies](https://img.shields.io/david/dev/xyy94813/update-graphql-schema.svg)](https://david-dm.org/xyy94813/update-graphql-schema?type=dev)

[![npm package](https://img.shields.io/npm/v/update-graphql-schema.svg?style=flat-square)](https://www.npmjs.org/package/update-graphql-schema)
[![npm downloads](https://img.shields.io/npm/dm/update-graphql-schema.svg?style=flat-square)](http://npmjs.com/update-graphql-schema)

## Usage

### Install

Use npm:

```
npm i update-graphql-schema
npm i update-graphql-schema -g
```

Or use yarn:

```
yarn add update-graphql-schema
yarn global add update-graphql-schema
```

### Cli

```bin
Usage: updateSchema [options] <file ...>

Options:
  -v, --version            output the version number
  -c, --config <file ...>  Config files path
  -h, --headers <items>    Request Headers
  -o, --output <file ...>  Output Path, Default: `${process.cwd()}/schema.json`
  -p, --point [value]      Endpoint url
  -t, --type [value]       Schema type `json` or `graphql`. Note: It will always be `json` if output file extension is `json`.
  -h, --help               output usage information
```

#### With Config File

Config file `./updateSchemaConf.js`

```js
module.exports = {
  point: 'https://your.graphql.server/graphq',
  output: './schema.json', 
  type: 'json', // or graphq
  headers: {
    authorization: 'bear XXXXXXXXXXXXXXXXXX',
  },
};
```

Or use json conf `./updateSchemaConf.json`

```json
{
  "point": "https://your.graphql.server/graphq",
  "output": "./schema.graphql",
  "type": "graphql",
  "headers": {
    "authorization": "bear XXXXXXXXXXXXXXXXXX"
  }
}
```

Then, run this command

```sh
updateSchema -c ./updateSchemaConf.js
// or
// updateSchema -c ./updateSchemaConf.json
```

### Node modules

```js
const updateGraphqlSchema = require('update-graphql-schema');
const path = require('path');

updateGraphqlSchema({
  endPoint: 'https://api.github.com/graphql',
  output: path.resolve(__dirname, 'schema.graphql'),
  schemaType: 'graphql',
  headers: {
    Authorization: 'bearer 4ad4XXXXXXXXXXXXXXXXX85bf7',
  },
});
```

## Contruibution

DefinitelyTyped only works because of contributions by users like you!

### Git Message

[Follow the Angular git commit message specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

But, you can ignore the `scope`
