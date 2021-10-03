const DynamoDB = require("./supports/dynamodb");
const { STAT } = require("./supports/domain.constant");

module.exports = {
    async listHistory() {
        const params = {
            "TableName": process.env.TBL_UPC_HISTORY,
            "IndexName": "state-index",
            "KeyConditionExpression": '#state = :state',
            "ExpressionAttributeNames": {
                "#state": "state"
            },
            "ExpressionAttributeValues": {
                ":state": STAT.ACTIVE
            }
        };
        const result = await DynamoDB.query(params);
        return result;
    },
    async updateHistory(historyId) {
        const params = {
            "TableName": process.env.TBL_UPC_HISTORY,
            "Key": {
                "ID": historyId
            },
            "UpdateExpression": 'set #st = :st',
            "ExpressionAttributeNames": {
                "#st": "state"
            },
            "ExpressionAttributeValues": {
                ":st": STAT.LOCK
            }
        };
        const result = await DynamoDB.update(params);
        return result;
    }
};