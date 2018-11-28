'use strict';

const updateGraphqlSchema = require('../index');
const path = require('path');
const fs = require('fs');
const fetch = require('jest-fetch-mock');

jest.setMock('node-fetch', fetch);
jest.mock('fs');

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
    fs.__setMockFiles(MOCK_FILE_INFO);
    fetch.resetMocks();
  });

  // it('nomal usage', async () => {
  //   fetch.mockResponseOnce(successRespons, {
  //     status: 200,
  //     headers: { 'content-type': 'application/json', ok: true },
  //     ok: true,
  //     okay: true,
  //   });
  //   await updateGraphqlSchema({
  //     endPoint,
  //     output,
  //     headers,
  //   });
  //   expect(fs.readFileSync(output)).expect(successRespons);
  // });
  it('update failed by network reason', async () => {
    fetch.mockReject(() => Promise.reject('Network Error'));
    expect(
      updateGraphqlSchema({
        endPoint,
        output,
        headers,
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
