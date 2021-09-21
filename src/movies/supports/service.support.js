// const moment = require("moment-timezone");

module.exports = {
    getMomentLocal(date) {
        if(!date){
            date = new Date();    
        }
        return "" //moment(date.getTime()).tz("America/Lima");
    },
    getMomentString(date) {
        if(!date){
            date = new Date();    
        }
        return "" //moment(date.getTime()).tz("America/Lima").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    },
    getMomentStringFormat(date,format) {
        if(!date){
            date = new Date();    
        }
        return "" //moment(date.getTime()).tz("America/Lima").format(format);
    },
    getUUID(){
        return Uuid.version4();
    },
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    createResponse(data){
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    },
    getMomentLocalSeconds(date) {
        if(!date){
            date = new Date();    
        }
        let aux = "" //`${moment(date.getTime()).tz("America/Lima").valueOf()}`;
        aux = aux.substring(0, aux.length - 3);
        return parseInt(aux);
    },
    addDays(date, days) {
        if(!date){
            date = new Date();    
        }
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    },
    sortElementsArray(array = [], field){
        array.sort(function (a, b) {
            if (a[field] > b[field]) {
                return 1;
            }
            if (b[field] > a[field]) {
                return -1;
            }
            return 0;
        });
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