from src.recommenderMovies.service import Service

class Controller:
    def __init__(self):
        self.service = Service()

    def recommender_movie(self):
        print('controller !!!')
        return ''