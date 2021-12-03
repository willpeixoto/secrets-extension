const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path');

module.exports.readConfigFile = async () => new Promise((resolve, reject) => {
  console.log('[EXTENSION], debugging checking file');
  try {
    console.log(path.resolve("/var/task/secrets-config.yaml"));
    const config = yaml.load(fs.readFileSync('/var/task/secrets-config.yaml', 'utf8', function (err, data) {
      if (err)
        console.log('error', err)
      reject(err);
    }));
    console.log('config', config)
    resolve(config);
  } catch (e) {
    console.log('[extension] error: ' + e);
  }
});

module.exports.writeCredentials = async (key, filename) => new Promise((resolve, reject) => {
  console.log('[extension] filename: ' + filename);
  const fullpath = `/tmp/${filename}`;
  const data = `{"credentials":${key}}`;
  console.log('fullpath', fullpath)
  try {

    if (fs.existsSync(fullpath)) {
      console.log('[extension]file exist => ' + filename);
      resolve(true);
    }
    else {
      fs.writeFile(`${fullpath}`, data, 'utf8', function (err) {
        if (err) {
          console.log('[extension] error to write in the file');
          reject(err);
        }
        //console.log('[extension] file was saved!');
        resolve(true);
      });
    }
  } catch (error) {
    console.log('[extension] Error: ' + error);
  }
});

module.exports.readFolder = async function () {
  console.log('[EXTENSION], debugging checking files exists')
  try {
    fs.readdir('/tmp/', (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    });
  } catch (e) {
    console.log(e);
  }

}