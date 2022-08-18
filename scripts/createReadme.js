const fs = require("fs");
const path = require("path");
const glob = require("glob");

var repName = "micro-frontends-notes";
var basePath = `https://github.com/ShenBao/${repName}/blob/master`;

let microList = "";

const mdFiles = glob.sync(path.join(__dirname, "../notes/*.md"));

Object.keys(mdFiles).map((index) => {
  const entryFile = mdFiles[index];
  const match = entryFile.match(/\/notes\/(.*)\/*\.md/);
  const [curPath, name] = match;
  const enPath = encodeURIComponent(curPath);
  microList += `- [${name?.split('/notes/')?.[1]}](${basePath}${enPath})\n`;
});

const omdFiles = glob.sync(path.join(__dirname, "../other-md/*.md"));

let mdList = "";

Object.keys(omdFiles).map((index) => {
  const entryFile = omdFiles[index];
  const match = entryFile.match(/\/other-md\/(.*)\/*\.md/);
  const [curPath, name] = match;
  const enPath = encodeURIComponent(curPath);
  mdList += `- [${name}](${basePath}${enPath})\n`;
});

const readmeTmp = `# micro-frontends-notes

微前端学习笔记

## 微前端解决方案

- [single-spa](https://github.com/single-spa/single-spa)
    - [English](https://single-spa.js.org/docs/)
    - [中文](https://zh-hans.single-spa.js.org/docs/)
- [qiankun](https://qiankun.umijs.org/)
- [micro-app](https://github.com/micro-zoe/micro-app)
- [wujie](https://wujie-micro.github.io/doc/)
- [icestark](https://github.com/ice-lab/icestark)
- [emp](https://github.com/efoxTeam/emp)
- [alibabacloud-alfa](https://github.com/aliyun/alibabacloud-alfa)

## notes

${microList}

## articles

${mdList}

## More links

- [GitHub Home](https://github.com/ShenBao)
- [Blog Home](https://shenbao.github.io)
- [About Me](https://shenbao.github.io/about/)

`;

fs.writeFileSync ( `./README.md`, "");
fs.writeFile(
  `./README.md`,
  readmeTmp,
  { flag: "a", encoding: "utf-8", mode: "0666" },
  function (err) {
    if (err) {
      console.log("\n======== error ========");
      throw err;
    }
    console.log("\n======== success ========");
  }
);
