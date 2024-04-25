from content_base import predict as x_base_predict
from svd import predict as svd_predict
from filter_games import filter_games_by_ids

def process_x_base(user_profile_list, ab_test_mode):
    game_ids = x_base_predict(user_profile_list, ab_test_mode)
    return filter_games_by_ids(game_ids)

def process_svd(user_profile_list, ab_test_mode):
    game_ids = svd_predict(user_profile_list, ab_test_mode)
    return filter_games_by_ids(game_ids)
