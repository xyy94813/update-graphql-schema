const fs = require("fs");
const { introspectionQuery } = require("graphql/utilities");
const fetch = require('node-fetch');

const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};

async function updateGraphqlSchema({ endPoint, output, headers }) {
  const response = await fetch(endPoint, {
    method: "post",
    body: JSON.stringify({
      query: introspectionQuery
    }),
    headers: {
      ...DEFAULT_HEADERS,
      ...headers
    }
  });
  // console.log(JSON.stringify(response))
  if (!response.ok) {
    throw Error(`[NetWorkError]: ${response.status} - ${response.statusText}`);
  }

  const newSchema = await response.text();
  await fs.writeFileSync(output, newSchema);
}

module.exports = updateGraphqlSchema;
