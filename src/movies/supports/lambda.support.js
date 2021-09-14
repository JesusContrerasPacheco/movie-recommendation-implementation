
const CustomException = require('./custom.exception');
  
module.exports = {
    async invokeFunctionSync(functionName, payload, action) {
      const lambda = new AWS.Lambda();
      const data = await lambda.invokeFunctionSync({
        functionName,
        payload,
        action,
      });
      if (data.error) {
        let det = (data.error.message) ? data.error.details : '';
  
        throw new CustomException(
          data.error.code,
          data.error.message,
          det,
          data.error.httpStatus,
        );
      }
  
      return data;
    },
    async invokeLegacyFunctionSync(functionName, payload) {
      const lambda = new AWS.Lambda();
      const data = await lambda.invokeLegacyFunctionSync({
        functionName,
        payload,
      });
  
      if (data.error) {
        let det = (data.error.message) ? data.error.details : '';
  
        throw new CustomException(
          data.error.code,
          data.error.message,
          det,
          data.error.httpStatus,
        );
      }
  
      return data;
    }
};
  