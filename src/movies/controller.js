const Service = require('./service');
// const Validation = require('./validation');

module.exports = {
  async listMovies(payload) {
    return await Service.listMovies(payload);
  },
  
};
