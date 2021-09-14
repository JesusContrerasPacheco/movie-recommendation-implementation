const DynamoDB = require("./supports/dynamodb");
const DomainConstant = require('./supports/domain.constant');
const ServiceSupport = require('./supports/service.support');
const LambdaSupport = require('./supports/lambda.support');

module.exports = {
    async createUser(payload) {
        return "OK";
    }
};