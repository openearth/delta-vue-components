#!/usr/bin/env node
const fs = require('fs')
const tokens = require('../src/tokens')
const themes = ['dark', 'light']

function createTokensFile (themeName) {
  fs.mkdirSync(`dist/${themeName}`)
  fs.writeFileSync(`dist/${themeName}/tokens.json`, JSON.stringify(tokens[themeName]))
}

fs.writeFileSync(`dist/index.js`, `
${themes.map(theme => `const ${theme} = require('./${theme}/tokens.common')`).join('\n')}
${themes.map(theme => `module.exports.${theme} = ${theme}`).join('\n')}
`)

console.log('🤖  generated index file')

themes.forEach(createTokensFile)

console.log('🤖  generated token files')