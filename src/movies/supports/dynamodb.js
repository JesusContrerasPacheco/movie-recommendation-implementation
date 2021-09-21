
const CustomException = require('./custom.exception');
const ErrorConstant = require('./error.constant');
const DomainConstant = require('./domain.constant');

const ServiceSupport = require("./service.support");

const AWS = require('aws-sdk');
const DynamoDBClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    async put(param) {
        console.debug(`put registro en tabla dynamo: ${param.TableName}`);
        try {
            const result = await DynamoDBClient.put(param).promise();
            console.debug(`success insert`);
            console.debug(result);
            return result;
        } catch (error) {
            console.error(`error insert`);
            console.error(error);
            new CustomException(
                ErrorConstant.DB.INSERT.code,
                error.message,
                error.stack,
                500,
            );
        }
    },
    async update(param) {
        console.debug(`update registro en tabla dynamo: ${param.TableName}`);
        try {
            const result = await DynamoDBClient.update(param).promise();
            console.debug(`success update`);
            console.debug(result);
            return result;
        } catch (error) {
            console.error(`error update`);
            console.error(error);
            new CustomException(
                ErrorConstant.DB.UPDATE.code,
                error.message,
                error.stack,
                500,
            );
        }
    },
    async query(param, type) {
        console.debug(`query registro en tabla dynamo: ${param.TableName}`);
        try {
            const result = await DynamoDBClient.query(param).promise();
            console.debug(`success query`);
            console.debug(result);
            let newData = type === DomainConstant.DYNAMODB.QUERY.FIRST ? {} : [];
            if(result.Items.length > 0) {
                newData = type === DomainConstant.DYNAMODB.QUERY.FIRST ? result.Items[0] : result.Items;
            }
            return newData;
        } catch (error) {
            console.error(`error query`);
            console.error(error);
            new CustomException(
                ErrorConstant.DB.QUERY.code,
                error.message,
                error.stack,
                500,
            );
        }
    }
};