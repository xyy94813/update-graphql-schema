const fs = require('fs');
const getJSONSchemaFromEndPoint = require('./getJSONSchemaFromEndPoint');
const transformJSONSchemaToGraphqlSchema = require('./transformJSONSchemaToGraphqlSchema');

const isJSONFile = filename => /\.json$/.test(filename);

async function updateGraphqlSchema({
  endPoint,
  output,
  schemaType = isJSONFile(output) ? 'json' : 'graphql',
  headers,
}) {
  const jsonSchema = await getJSONSchemaFromEndPoint(endPoint, headers);
  let schema = jsonSchema;
  if (!isJSONFile(output) && schemaType !== 'json') {
    schema = transformJSONSchemaToGraphqlSchema(jsonSchema);
  }
  fs.writeFileSync(output, schema);
}

module.exports = updateGraphqlSchema;
