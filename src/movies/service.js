const DataAccess = require('./data-access');
const axios = require('axios').default;
const ServiceSupport = require('./supports/service.support')
const { API_EXTERNAL,API_EXTERNAL_MOVIE_RECOMMENDER } = require("./supports/domain.constant");

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

    async recommenderMovies(payload){
        
        const {movieId,ntop, user} = payload

        let response = await axios.post(API_EXTERNAL_MOVIE_RECOMMENDER, {
            movieId: movieId,
            ntop: ntop
        });   
        response = await ServiceSupport.getPosters(response.data)

        // add history
        await DataAccess.registerHistory({ 
            ID: ServiceSupport.uidv4(), 
            user, 
            date: `${new Date().toISOString()}`, 
            recommerders: response.recommerders,
            state: "ACT"
        });

        return JSON.stringify(response);
    },
};