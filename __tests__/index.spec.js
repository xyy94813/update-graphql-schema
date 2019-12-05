'use strict';

const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { printSchema, buildClientSchema } = require('graphql');
const mockJsonSchema = require('./mockJsonSchema.json');
const updateGraphqlSchema = require('../core');

describe('updateGraphqlSchema', () => {
  const output = path.resolve(__dirname, 'schema.json');
  const graphqlExtentionOutput = path.resolve(__dirname, 'schema.graphql');
  const endPoint = 'https://api.github.com/graphql';
  const headers = {};

  const successResHeaders = {
    status: 200,
    headers: { 'content-type': 'application/json' },
    ok: true,
  };
  const successRes = JSON.stringify(mockJsonSchema);

  const graphQLSchema = printSchema(
    buildClientSchema(JSON.parse(successRes).data),
    {
      commentDescriptions: true,
    }
  );

  const MOCK_FILE_INFO = {
    [output]: successRes,
    [graphqlExtentionOutput]: graphQLSchema,
  };

  beforeEach(() => {
    // Set up some mocked out file info before each test
    fetch.resetMocks();
    fs.__restore();
  });

  it('nomal usage', async () => {
    fs.__setMockFiles(MOCK_FILE_INFO);

    fetch.mockResponse(successRes, successResHeaders);
    await updateGraphqlSchema({
      endPoint,
      output,
      headers,
    });
    expect(fs.readFileSync(output)).toBe(successRes);
  });

  it('update failed by network reason', async () => {
    fetch.mockResponse(successRes, {
      status: 401,
      headers: { 'content-type': 'application/json' },
      ok: false,
    });
    expect(
      updateGraphqlSchema({
        endPoint,
        output,
        headers,
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('graphql type schema', async () => {
    fs.__setMockFiles(MOCK_FILE_INFO);

    fetch.mockResponse(successRes, successResHeaders);
    await updateGraphqlSchema({
      endPoint,
      output: graphqlExtentionOutput,
      headers,
    });
    expect(fs.readFileSync(graphqlExtentionOutput)).toBe(graphQLSchema);
  });
});
