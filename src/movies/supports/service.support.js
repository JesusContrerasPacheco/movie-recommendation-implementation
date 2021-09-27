module.exports = {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    createResponse(data){
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    },
    isEmpty(...valores) {
        for (let i = 0; i < valores.length; i++) {
          const valor = valores[i];
          if ([null, undefined, 'undefined', 'null', '', 0, false, 'false', []].includes(valor)
          || (Array.isArray(valor) && valor.length === 0)
          || (valor.constructor === Object && Object.entries(valor).length === 0)) {
            return true;
          }
        }
        return false;
    }
};