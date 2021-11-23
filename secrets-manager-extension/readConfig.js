const secret = require('./secrets-manager');
const handleFile = require('./handle-files');

async function readConfig() {

  try {
    const configuration = await handleFile.readConfigFile();
    console.log('config', configuration);
    const myKey = configuration.SecretManager[0]["my_key"];
    const filename = configuration.SecretManager[0]["filename"];
    const myKeyPromise = secret.getSecretKey(myKey);
    const [myKeyDecoded] = await Promise.all([myKeyPromise]);
    await handleFile.writeCredentials(JSON.stringify(myKeyDecoded), filename);
  } catch (e) {
    console.log('[Extension] error to handle files in lambda tmp' + e);
  }
}
exports.readConfig = readConfig;
