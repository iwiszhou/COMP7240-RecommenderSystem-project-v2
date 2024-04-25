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
        result = filter_games_by_tags(tag_list)
        return result 
    except (IndexError, ValueError):
        print(ValueError)
        return []
    
@app.route('/getRecommendGames', methods=["POST"])
@cross_origin()
def get_recommendation():
    try:
        # data = request.get_json()
        data = json.loads(request.data)
        # value can be A or B or AB
        ab_test_mode = data['ab-test-mode']

        print("ab_test_mode", ab_test_mode)
        user_profiles = data['user-profiles']
        
        x_based_recommend = process_x_base(user_profiles, ab_test_mode)
        svd_recommend = process_svd(user_profiles, ab_test_mode)

        print(type(x_based_recommend))
        if(ab_test_mode == "AB"):
            result = {
                "content_based": x_based_recommend,
                "svd" : svd_recommend
            }
        if(ab_test_mode == "B"):
            result = {
                "content_based": x_based_recommend,
            }
        if(ab_test_mode == "A"):
            result = {
                "svd" : svd_recommend
            }

        return result
    except (IndexError, ValueError):
        print(ValueError)
        return []

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)