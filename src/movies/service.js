const DataAccess = require('./data-access');
// const ServiceSupport = require("./supports/service.support");

module.exports = {
    async listMovies(payload){
        let result = await DataAccess.listMovies(payload);
        console.log("result ", result)
        return result; //ServiceSupport.createResponse(result);
    }
};