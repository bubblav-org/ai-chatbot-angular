const fs = require('fs');

// Read the generated dist/package.json
const src = require('./dist/package.json');
const root = require('./package.json');

// Set the main module paths
root.main = 'dist/' + src.module;
root.module = 'dist/' + src.module;
root.types = 'dist/' + src.typings;
root.typings = 'dist/' + src.typings;

// Build exports with correct paths
// Use src.module and src.typings directly (they're already relative to dist folder)
root.exports = {
  './package.json': {
    default: './package.json'
  },
  '.': {
    types: './dist/' + src.typings,
    import: './dist/' + src.module,
    default: './dist/' + src.module
  }
};

root.sideEffects = src.sideEffects;
root.dependencies = src.dependencies;

// Write back to package.json
fs.writeFileSync('./package.json', JSON.stringify(root, null, 2));
console.log('✅ Post-processed package.json with correct exports');
