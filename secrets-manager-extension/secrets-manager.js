/*
    Author : willian Peixoto
    CreatedDate : 11 Dez 2020
    Description : Function to read secret key data from secret manager.
 */

// Load the AWS SDK client only with secretsManager lib to reduce the package
const SecretsManager = require('aws-sdk/clients/secretsmanager')

// Create a Secrets Manager client
const client = new SecretsManager({
    region: process.env.REGION ? process.env.REGION : "us-east-2",
    apiVersion: '2017-10-17'
});

module.exports.getSecretKey = async (secretName) => new Promise((resolve, reject) => {

    console.log("[extension] Secret Key for Reading Secret : ", secretName);
    client.getSecretValue({ SecretId: secretName }, function (err, data) {
        if (err) {
            console.log("[extension] Error Code in reading secret key : ", err.code);
            console.log("[extension] Error in reading secret key : ", err);

            if (err.code === 'DecryptionFailureException' ||
                err.code === 'InternalServiceErrorException' ||
                err.code === 'InvalidParameterException' ||
                err.code === 'InvalidRequestException' ||
                err.code === 'ResourceNotFoundException')
                reject(err);
        }
        else {
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            let secret;
            let decodedBinarySecret;
            if ('SecretString' in data) {
                secret = data.SecretString;
                // Uncomment for debugging purpose.
                //console.log("Secret String found in secret manager. : ", secret);
                resolve(secret);
            }
            else {
                const buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
                // Uncomment for debugging purpose.
                //console.log("Secret Binary found in secret manager. : ", decodedBinarySecret);
                resolve(decodedBinarySecret);
            }
        }
    });
});