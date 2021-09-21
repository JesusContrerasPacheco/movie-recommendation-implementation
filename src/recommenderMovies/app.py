from flask import Flask,request,jsonify


from src.recommenderMovies.controller import Controller
movie_controller= Controller()

app = Flask(__name__)



@app.route("/api/v1/movies/recommend",methods = ['POST'])
def recommerder():
    request_body = request.get_json()
    recommendations = movie_controller.recommender_movies(request_body)
    return jsonify(recommendations)



