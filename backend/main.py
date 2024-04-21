from flask import Flask, request
import json
from flask_cors import CORS, cross_origin

from filter_games import get_all_gaming_tags, filter_games_by_tags, to_json
from recommend_processor import process_x_base, process_svd 

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getAllTags')
@cross_origin()
def get_all_game_tags():
    try:
        return get_all_gaming_tags()
    except (IndexError, ValueError):
        print(ValueError)
        return []
    
@app.route('/getGamesByTags', methods=["POST"])
@cross_origin()
def get_games_by_tags():
    try:
        data = json.loads(request.data)
        tags_str = data['tags']
        if("," in tags_str):
            tag_list = data['tags'].split(",")
        else:
            tag_list = [tags_str]
        # print(tag_list)
        return filter_games_by_tags(tag_list)
    except (IndexError, ValueError):
        print(ValueError)
        return []
    
@app.route('/getRecommendGames', methods=["POST"])
@cross_origin()
def get_recommendation():
    try:
        # data = request.get_json()
        data = json.loads(request.data)
        user_profiles = data['user-profiles']
        
        x_based_recommend = process_x_base(user_profiles)
        svd_recommend = process_svd(user_profiles)

        print(type(x_based_recommend))

        result = {
            "content_based": x_based_recommend,
            "svd" : svd_recommend
        }

        return result
    except (IndexError, ValueError):
        print(ValueError)
        return []

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)