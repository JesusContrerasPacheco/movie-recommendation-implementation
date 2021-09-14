
const CustomException = require('./custom.exception');
const ErrorConstant = require('./error.constant');
const DomainConstant = require('./domain.constant');

const AWS = require('aws-sdk');
const DynamoDBClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    async put(param) {
        Logger.debug(`put registro en tabla dynamo: ${param.TableName}`);
        try {
            const result = await DynamoDBClient.put(param).promise();
            Logger.debug(`success insert`);
            Logger.debug(result);
            return result;
        } catch (error) {
            Logger.error(`error insert`);
            Logger.error(error);
            new CustomException(
                ErrorConstant.DB.INSERT.code,
                error.message,
                error.stack,
                HttpConstant.BAD_REQUEST_STATUS.code,
            ).throw(!Types.isEmpty(error));
        }
    },
    async update(param) {
        Logger.debug(`update registro en tabla dynamo: ${param.TableName}`);
        try {
            const result = await DynamoDBClient.update(param).promise();
            Logger.debug(`success update`);
            Logger.debug(result);
            return result;
        } catch (error) {
            Logger.error(`error update`);
            Logger.error(error);
            new CustomException(
                ErrorConstant.DB.UPDATE.code,
                error.message,
                error.stack,
                HttpConstant.BAD_REQUEST_STATUS.code,
            ).throw(!Types.isEmpty(error));
        }
    },
    async query(param, type) {
        Logger.debug(`query registro en tabla dynamo: ${param.TableName}`);
        try {
            const result = await DynamoDBClient.query(param).promise();
            Logger.debug(`success query`);
            Logger.debug(result);
            let newData = type === DomainConstant.DYNAMODB.QUERY.FIRST ? {} : [];
            if(result.Items.length > 0) {
                newData = type === DomainConstant.DYNAMODB.QUERY.FIRST ? result.Items[0] : result.Items;
            }
            return newData;
        } catch (error) {
            Logger.error(`error query`);
            Logger.error(error);
            new CustomException(
                ErrorConstant.DB.QUERY.code,
                error.message,
                error.stack,
                HttpConstant.BAD_REQUEST_STATUS.code,
            ).throw(!Types.isEmpty(error));
        }
    }
};