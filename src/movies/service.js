const DataAccess = require('./data-access');
const axios = require('axios').default;
const { API_EXTERNAL } = require("./supports/domain.constant");

module.exports = {
    async listMovies(payload){
        let result = await DataAccess.listMovies(payload);
        return result;
    },
    async popularListMovies(payload){
        const response = await axios.get(API_EXTERNAL);
        console.log(response.data.results);
        return response.data.results;
    },
};