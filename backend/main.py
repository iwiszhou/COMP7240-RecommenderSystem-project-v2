from flask import Flask, request
import json
from flask_cors import CORS, cross_origin

from filter_games import get_all_gaming_tags, filter_games_by_tags
from recommend_processor import process_item_base, process_svd 

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
        tag_list = data['tags'].split(",")
        print(tag_list)
        return filter_games_by_tags(tag_list)
    except (IndexError, ValueError):
        print(ValueError)
        return []
    
@app.route('/getRecommendGames', methods=["POST"])
@cross_origin()
def get_recommendation():
    try:
        data = request.get_json()
        user_profiles = data['user-profiles']
        print(user_profiles)
        item_based_recommend = process_item_base(user_profiles)
        svd_recommend = process_svd(process_svd)

        return {
            "item_based": item_based_recommend,
            "svd" : svd_recommend
        }
    except (IndexError, ValueError):
        print(ValueError)
        return []

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)