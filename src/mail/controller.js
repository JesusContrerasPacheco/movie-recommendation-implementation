const Service = require('./service');

module.exports = {
  async sendMailHistory(payload) {
    return await Service.sendMailHistory(payload);
  },
};
