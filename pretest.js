// pretest.js
const fs = require('fs');
const path = require('path');
const resultsDir = path.join(__dirname, 'test-results');
if (fs.existsSync(resultsDir)) {
  fs.rmSync(resultsDir, { recursive: true, force: true });
  console.log('test-results folder was removed.');
}