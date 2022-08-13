const filePath = require('./filePath')
const runShellSync = require('./util').runShellSync

function cleanNodeModules() {
  Object.keys(filePath).forEach(item => {
    runShellSync(`rm -rf ${filePath[item]}/node_modules`)
  })
}

cleanNodeModules();
