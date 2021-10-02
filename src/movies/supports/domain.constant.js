module.exports = {
    DYNAMODB: {
        QUERY: {
            FIRST: "first"
        }
    },
    STAT: {
        ACTIVE: "ACT",
        INACTIVE: "INA",
        PENDEND: "PEN",
        LOCK: "LCK",
        REJECT: "REJ"
    },
    DATABASE: {
        INSERT: {
          code: "DBS001",
          message: "Success Insert"
        },
        UPDATE: {
          code: "DBS002",
          message: "Success Update"
        },
        QUERY: {
          code: "DBS003",
          message: "Success Query"
        }
    },
    API_EXTERNAL_MOVIE_RECOMMENDER: process.env.API_EXTERNAL_MOVIE_RECOMMENDER,
    API_KEY_TMDB: process.env.API_KEY_TMDB,
    API_EXTERNAL: "https://api.themoviedb.org/3/movie/popular?api_key=6d45390016625080a1caacc79a089261&language=en-US&page=1"
};