const controllers = require("./controller");

module.exports.handler = async (event) => {
    console.log(`event! `, event)
    /*const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };*/
    return await controllers[event.action](event.body);
};
