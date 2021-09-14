const AWS = require("aws-sdk");
const CustomException = require('./custom.exception');
  
module.exports = {
    async encrypt(payload){
        const kms = new AWS.KMS({});
        const params = {
            KeyId: process.env.KMS_KEY_USER,
            Plaintext: payload
        };
        const dataEncrypt = await kms.encrypt(params).promise();
        if(!Types.isEmpty(dataEncrypt.$response.error)){
            Logger.error(`Parameter no encrypt`);
            Logger.error(dataEncrypt.$response.error)
            throw new CustomException(
                dataEncrypt.$response.error.code,
                dataEncrypt.$response.error.message,
                dataEncrypt.$response.error.stack,
                dataEncrypt.$response.error.statusCode,
            );
        }
        return dataEncrypt.CiphertextBlob.toString('base64');
    },
    async decrypt(base64EncryptedString){
        const kms = new AWS.KMS({});
        const params = {
            CiphertextBlob: Buffer.from(base64EncryptedString, 'base64'),
            KeyId: process.env.KMS_KEY_USER
        };
        const dataDecrypt = await kms.decrypt(params).promise();
        if(!Types.isEmpty(dataDecrypt.$response.error)){
            Logger.error(`Parameter no decrypt`);
            Logger.error(dataDecrypt.$response.error);
            throw new CustomException(
                dataDecrypt.$response.error.code,
                dataDecrypt.$response.error.message,
                dataDecrypt.$response.error.stack,
                dataDecrypt.$response.error.statusCode,
            );
        }
        return dataDecrypt.Plaintext.toString('utf-8');
    }
};
  