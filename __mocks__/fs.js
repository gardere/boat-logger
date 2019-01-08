// __mocks__/fs.js
'use strict';

const path = require('path');

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

const writtenFiles = [];
function __getWrittenFiles() {
    return writtenFiles;
}
function __resetWrittenFiles() {
    writtenFiles.splice(0);
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

function writeFile(filename, content, callback) {
    writtenFiles.push({filename, content});
};

fs.__setMockFiles = __setMockFiles;
fs.__getWrittenFiles = __getWrittenFiles;
fs.__resetWrittenFiles = __resetWrittenFiles;
fs.readdirSync = readdirSync;
fs.writeFile = writeFile;

module.exports = fs;