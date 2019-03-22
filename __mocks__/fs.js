// __mocks__/fs.js
'use strict';

const path = require('path');

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles) {
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

function __restore() {
  mockFiles = Object.create(null);
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

function writeFileSync(output, newSchema) {
  mockFiles[output] = newSchema;
  return;
}

function readFileSync(filePath) {
  return mockFiles[filePath] || null;
}

fs.__setMockFiles = __setMockFiles;
fs.__restore = __restore;
fs.writeFileSync = writeFileSync;
fs.readFileSync = readFileSync;
fs.readdirSync = readdirSync;

module.exports = fs;
