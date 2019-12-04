'use strict';

const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const updateGraphqlSchema = require('../core');

describe('updateGraphqlSchema', () => {
  const output = path.resolve(__dirname, 'schema.json');
  const endPoint = 'https://api.github.com/graphql';
  const headers = {};

  const successRespons = JSON.stringify({ message: 'YATTA!' });
  const MOCK_FILE_INFO = {
    [output]: successRespons,
  };

  beforeEach(() => {
    // Set up some mocked out file info before each test
    fetch.resetMocks();
    fs.__restore();
  });

  it('nomal usage', async () => {
    fs.__setMockFiles(MOCK_FILE_INFO);

    fetch.mockResponse(successRespons, {
      status: 200,
      headers: { 'content-type': 'application/json' },
      ok: true,
    });
    await updateGraphqlSchema({
      endPoint,
      output,
      headers,
    });
    expect(fs.readFileSync(output)).toBe(successRespons);
  });
  it('update failed by network reason', async () => {
    fetch.mockResponse(successRespons, {
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
});
