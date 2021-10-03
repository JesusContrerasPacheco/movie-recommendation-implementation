
const CustomException = require('./custom.exception');
const AWS = require("aws-sdk");
  
module.exports = {
    async invokeLegacyFunctionSync(FunctionName, Payload) {
      return new Promise((resolve, reject) => {
        const lambda = new AWS.Lambda();
        const params = {
          FunctionName,
          InvocationType: 'Event',
          LogType: 'Tail',
          Payload: JSON.stringify(Payload)
        }
        lambda.invoke(params, (error, data) => {
                      if (error) {
                        reject(error) 
                      } else {
                        resolve(data)
                      }
                  });
    
      })
    }
};
  