const controllers = require("./controller");

module.exports.handler = async (event) => {
    console.log(`event! `, event)
    return await controllers.sendMailHistory();
};
