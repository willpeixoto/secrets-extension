const secret = require('./secrets-manager');
const handleFile = require('./handle-files');

async function readConfig() {
  try {
    const key = process.env.EXTENSION_KEYS
    const filename = process.env.EXTENSION_FILENAME
    console.log('key', key)
    let myKeyValues = [];
    if (key.includes(',')) {
      const keys = key.split(',');
      let keysPromises = [];
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        keysPromises.push(secret.getSecretKey(key))
      }
      myKeyValues = await Promise.all(keysPromises);
      //console.log('myKeyValues', myKeyValues);
    } else {
      myKeyValues.push(await secret.getSecretKey(key));
    }
    console.log('myKeyValues', myKeyValues);

    await handleFile.writeCredentials(JSON.stringify(myKeyValues), filename);
    await handleFile.readFolder()
  } catch (e) {
    console.log('[extension] error to handle files in lambda tmp' + e);
  }
}
exports.readConfig = readConfig;
