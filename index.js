var path = require("path");

module.exports = function(content) {
  const defaultConfig = {
    basePath: [],
  };

  const config = Object.assign(defaultConfig, this.query);
  const fileName = path.basename(this.resourcePath);

  if(config.pathReg) {
    const filePaths = this.resourcePath.replace(config.pathReg, '$1').split(/[\\\/]/);
    const filePathArray = config.basePath.concat(filePaths);
    const filePath = JSON.stringify(filePathArray).slice(1, -1);
    return (
      "const path = require('path');" +
      "const filePath = path.resolve(path.resolve(''), " +
      filePath +
      ");" +
      "try { global.process.dlopen(module, filePath); } " +
      "catch(exception) { throw new Error('Cannot open ' + filePath + ': ' + exception); };"
    );
  } else {
    const filePathArray = config.basePath.concat(fileName);
    const filePath = JSON.stringify(filePathArray).slice(1, -1);

    return (
      "const path = require('path');" +
      "const filePath = path.resolve(path.resolve(''), " +
      filePath +
      ");" +
      "try { global.process.dlopen(module, filePath); } " +
      "catch(exception) { throw new Error('Cannot open ' + filePath + ': ' + exception); };"
    );
  }
};

module.exports.raw = true;
