const path = require("path");
const childProcess = require("child_process");

const filePath = {
  react15: path.join(__dirname, "../react15"),
  react16: path.join(__dirname, "../react16"),
  vue2: path.join(__dirname, '../vue2'),
  vue3: path.join(__dirname, '../vue3'),
};

function runChild() {
  Object.values(filePath).forEach((appPath) => {
    childProcess.spawn(`cd ${appPath} && npm start`, {
      stdio: "inherit",
      shell: true,
    });
  });
}

runChild();
