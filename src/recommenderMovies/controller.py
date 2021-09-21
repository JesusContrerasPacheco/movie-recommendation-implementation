from src.recommenderMovies.service import Service

class Controller:
    def __init__(self):
        self.service = Service()

    def recommender_movies(self,request_body):
        movie_id  =  request_body['movieId']
        n_results = request_body['nResults']
        recommendations = self.service.recommender_movies(movie_id,n_results)
        return recommendations