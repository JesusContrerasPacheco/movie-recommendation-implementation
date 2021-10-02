const axios = require('axios').default;
const { API_KEY_TMDB } = require("./domain.constant");
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
    },
    async getPosters(data){
        
        data.recommerders = await Promise.all(data.recommerders.map(async(value)=>{
            
            let poster = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${value.title}`)
            value['poster'] = poster.data.total_results>0? `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster.data.results[0].poster_path}`:''
    
            return value;
        
        }));

        
        return data;
     
     
    }
};