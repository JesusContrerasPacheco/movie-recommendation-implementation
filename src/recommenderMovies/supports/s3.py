
import pandas as pd
from s3fs.core import S3FileSystem
s3client = S3FileSystem()
import numpy as np
import os;

BUCKET_KEY_RATINGS  = os.environ['BUCKET_KEY_RATINGS']  
BUCKET_KEY_MOVIES   = os.environ['BUCKET_KEY_MOVIES']  
# BUCKET_KEY_MODEL    = os.getenv('BUCKET_KEY_MODEL')  
BUCKET_NAME = os.environ['BUCKET_MOVIES']

class S3:
    
   
    def load_movies(self):
        print('Loading Movies DataFrame....')
        movies = np.load(s3client.open('{}/{}'.format(BUCKET_NAME, BUCKET_KEY_MOVIES)),allow_pickle=True)
        movies = pd.DataFrame(movies, columns = ['movieId','title','genres','year'])
        print('Movies DataFrame Loaded')
        # Cast properties
        movies.movies   = movies.userId.astype(int)
        movies.title    = movies.movieId.astype(str)
        movies.genres   = movies.rating.astype(str)
        movies.year     = movies.rating.astype(str)

        movies.head()

        return movies

    def load_ratings(self): 
        print('Loading Rating DataFrame....')
        ratings = np.load(s3client.open('{}/{}'.format(BUCKET_NAME, BUCKET_KEY_RATINGS)),allow_pickle=True)
        ratings = pd.DataFrame(ratings, columns = ['userId','movieId','rating'])
        print('Rating DataFrame Loaded')
        # Cast properties
        ratings.userId  = ratings.userId.astype(int)
        ratings.movieId = ratings.movieId.astype(int)
        ratings.rating  = ratings.rating.astype(np.float32)

        ratings.head()

        return ratings
    def load_knn_model(self):
        return ''
    