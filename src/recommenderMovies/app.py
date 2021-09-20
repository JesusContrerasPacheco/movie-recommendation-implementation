from flask import Flask,request


from src.recommenderMovies.controller import Controller
movie_controller= Controller()

app = Flask(__name__)



@app.route("/api/v1/movies/recommend",methods = ['POST'])
def recommerder():
    # request_body = request.get_json()
    # movie_controller.recommender_movie(self)
    # movie_id  =  request_body['movieId']
    # n_results = request_body['nResults']
    
    # recommended_shows_dict = recommender_movie(movie_id,n_results)
    return 'hello'
    # return jsonify(recommended_shows_dict)



