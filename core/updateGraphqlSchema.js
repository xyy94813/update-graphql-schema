const fs = require('fs');
const getJSONSchemaFromEndPoint = require('./getJSONSchemaFromEndPoint');

async function updateGraphqlSchema({ endPoint, output, headers }) {
  const newSchema = await getJSONSchemaFromEndPoint(endPoint, headers);
  fs.writeFileSync(output, newSchema);
}

module.exports = updateGraphqlSchema;
