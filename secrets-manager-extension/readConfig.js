const secret = require('./secrets-manager');
const handleFile = require('./handle-files');

async function readConfig() {
  try {
    const keys = process.env.EXTENSION_KEYS
    const filename = process.env.EXTENSION_FILENAME
    console.log('keys', keys)
    const myKeyValue = await secret.getSecretKey(keys);
    console.log('myKeyPromise', myKeyValue);

    await handleFile.writeCredentials(JSON.stringify(myKeyValue), filename);
    await handleFile.readFolder()
  } catch (e) {
    console.log('[extension] error to handle files in lambda tmp' + e);
  }
}
exports.readConfig = readConfig;
