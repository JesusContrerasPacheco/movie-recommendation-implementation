const DynamoDB = require("./supports/dynamodb");

module.exports = {
    async listMovies(payload) {
        const params = {
            "TableName": process.env.TBL_UPC_MOVIES,
            "IndexName": "year-index",
            "KeyConditionExpression": '#year = :year',
            "FilterExpression" : "contains(#title, :title)",
            "ExpressionAttributeNames": {
                "#year": "year",
                "#title": "title"
            },
            "ExpressionAttributeValues": {
                ":year": "(2002)", //valor por defecto con mayor resultado
                ":title": payload.title
            },
            "ProjectionExpression": `movieId, title, genres`
        };
        const result = await DynamoDB.query(params);
        return result;
    }
};