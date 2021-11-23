const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path');

module.exports.readConfigFile = async () => new Promise((resolve, reject) => {
  console.log('[EXTENSION], debugging checking file');
  try {
    console.log(path.resolve("/var/task/secrets-config.yaml"));
    const config = yaml.load(fs.readFileSync('/var/task/secrets-config.yaml', 'utf8', function (err, data) {
      if (err)
        reject(err);
    }));
    console.log('config', config)
    resolve(config);
  } catch (e) {
    console.log('[Extension] error: ' + e);
  }
});

module.exports.writeCredentials = async (key, filename) => new Promise((resolve, reject) => {
  console.log('[Extension] filename: ' + filename);
  const fullpath = `/tmp/${filename}`;
  const data = `{"credentials":${key}}`;
  try {
    if (fs.existsSync(fullpath)) {
      console.log('[Extension]file exist => ' + filename);
      resolve(true);
    }
    else {
      fs.writeFile(`${fullpath}`, data, 'utf8', function (err) {
        if (err) {
          console.log('[Extension] error to write in the file');
          reject(err);
        }
        //console.log('[Extension] file was saved!');
        resolve(true);
      });
    }
  } catch (error) {
    console.log('[Extension] Error: ' + error);
  }
});