const fs = require('fs');
//const path = require('path');

module.exports.writeCredentials = async (key, filename) => new Promise((resolve, reject) => {
  console.log('[extension] filename: ' + filename);
  const fullpath = `/tmp/${filename}`;
  try {
    if (fs.existsSync(fullpath)) {
      console.log('[extension]file exist => ' + filename);
      resolve(true);
    }
    else {
      fs.writeFile(`${fullpath}`, key, 'utf8', function (err) {
        if (err) {
          console.log('[extension] error to write in the file');
          reject(err);
        }
        resolve(true);
      });
    }
  } catch (error) {
    console.log('[extension] Error: ' + error);
  }
});

module.exports.readFolder = async function () {
  //console.log('[extension], debugging checking files exists')
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