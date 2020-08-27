const { introspectionQuery, getIntrospectionQuery } = require('graphql');
const fetch = require('node-fetch');

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

async function getJSONSchemaFromEndPoint(endPoint, headers) {
  const response = await fetch(endPoint, {
    method: 'post',
    body: JSON.stringify({
      // `introspectionQuery` is deprecated in v15, 
      query: introspectionQuery || getIntrospectionQuery(), 
    }),
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
  });

  if (!response.ok) {
    throw Error(`[NetWorkError]: ${response.status} - ${response.statusText}`);
  }

  const newSchema = await response.text();

  return newSchema;
}

module.exports = getJSONSchemaFromEndPoint;
