const DataAccess = require('./data-access');
const LambdaSupport = require("./supports/lambda.support");
const { MESSAGES, MAIL } = require("./supports/domain.constant")

module.exports = {
    async sendMailHistory(payload){

        let msg = "";

        // obtener listado de usuarios que hicieron recomendacion
        let result = await DataAccess.listHistory();

        if(result.length > 0){
            await Promise.all(
                result.map(async (item) => {
                    if(item.user) {
 
                        // estructura
                        const params = {
                            "to": item.user,
                            "from": "jesuscp17.17@gmail.com",
                            "fromName": "Movies UPC",
                            // "html": `<b>$user</b>`,
                            "payLoad": {
                                user: item.user,
                                movies: item.recommerders
                            },
                            "subject": MESSAGES.SUBJECT,
                            "bucketName": MAIL.BUCKET,
                            "keyName": MAIL.KEY
                        };

                        // enviar correo utilizando el servicio
                        await LambdaSupport.invokeLegacyFunctionSync(process.env.LMB_MAIL_SERVICE, params);
                        await DataAccess.updateHistory(item.ID);
                    }
                })
            )
            msg = `Mensajes enviados a los usuarios: ${result.map(h => h?.user).join(",")}`
        } else {
            msg = "No existen informacion para enviar"
        }

        return msg;
    }
};