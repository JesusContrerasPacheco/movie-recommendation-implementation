const Service = require('./service');
// const Validation = require('./validation');

module.exports = {
  async listMovies(payload) {
    return await Service.listMovies(payload);
  },

  async popularListMovies(payload){
    return await Service.popularListMovies(payload);
  },
  
};
