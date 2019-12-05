const { printSchema, buildClientSchema } = require('graphql');

const transformJSONSchemaToGraphqlSchema = jsonSchema => {
  return printSchema(buildClientSchema(JSON.parse(jsonSchema).data), {
    commentDescriptions: true,
  });
};

module.exports = transformJSONSchemaToGraphqlSchema;
