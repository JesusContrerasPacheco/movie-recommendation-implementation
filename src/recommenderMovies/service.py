from src.recommenderMovies.supports.s3 import S3
s3_support = S3()

class Service:

    def __init__(self):
        self.df_ratings = s3_support.load_ratings()
        self.df_movies  = s3_support.load_ratings()
        self.model      = s3_support.load_knn_model()



    def recommender_movies(self):
        print('service !!!')
        return ''