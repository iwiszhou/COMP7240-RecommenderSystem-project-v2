from item_base import predict as item_base_predict
from svd import predict as svd_predict
from filter_games import filter_games_by_ids

def process_item_base(user_profile_list):
    game_ids = item_base_predict(user_profile_list)
    return filter_games_by_ids(game_ids)

def process_svd(user_profile_list):
    game_ids = svd_predict(user_profile_list)
    return filter_games_by_ids(game_ids)
