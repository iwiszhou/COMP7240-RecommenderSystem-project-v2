import copy
import numpy as np
import pandas as pd

_GAMES_DATASET_FILENAME = "/data/steam_games_with_one_hot_v2.csv"
_USER_PROFILES_FILENAME = "/data/user_profiles_content_based_one_hot.csv"

def new_user_profiles():
    '''
    For debug only.
    '''
    file_columns = copy.deepcopy(_genres_list)
    file_columns.insert(0, 'user_id')
    pd.DataFrame(columns=file_columns).to_csv(_USER_PROFILES_FILENAME, index=False)

def predict(user_selections):
    '''
    Python dict or JSON-like input: 
    [{"user_id": user_id, "game_name": game_name, "game_id": game_id, "rating": rating},]
    '''
    def _update_user_profiles():    # Update user profiles every query
        for user_selection in user_selections:
            user_id = user_selection['user_id']
            game_id = user_selection['game_id']
            rating = user_selection['rating']
            if user_id in _user_profiles_df.index:
                user_profile_arr = _user_profiles_df.loc[user_id].to_numpy()
            else:
                user_profile_arr = np.array([0 for _ in range(len(_genres_list))])
            game_one_hot_arr = _games_one_hot_df.loc[game_id].to_numpy()
            user_rating_update = user_profile_arr + game_one_hot_arr * rating
            _user_profiles_df.loc[user_id] = user_rating_update
        _user_profiles_df.to_csv(_USER_PROFILES_FILENAME)

    def _get_all_users_in_a_query():    # Check if there are multiple user_id
        user_ids = set()
        for user_selection in user_selections:
            user_ids.update([user_selection['user_id']])
        return user_ids

    def _normalize(user_profile):
        user_profile = user_profile.to_numpy().astype(np.float32)
        user_profile /= np.linalg.norm(user_profile, ord=1)
        return user_profile

    def _in_user_selections(game_id):
        for user_selection in user_selections:
            if game_id == user_selection['game_id']:
                return True
        return False

    def _get_top(ratings_vector, k=10):
        ratings_df = pd.DataFrame(_games_df['all_reviews_score'])
        ratings_df.insert(loc=1, column='ratings',value=ratings_vector)
        # ratings_df.sort_index(ascending=True, inplace=True)
        ratings_df = ratings_df.sort_values(by=['ratings', 'all_reviews_score'], ascending=[False, False])
        top_k_list = []
        for game_id, _ in ratings_df.iterrows():
            if not _in_user_selections(game_id):
                top_k_list.append(game_id)
                k -= 1
            if k == 0: break
        return top_k_list

    _update_user_profiles()
    user_ids = _get_all_users_in_a_query()
    for user_id in user_ids:
        user_profile_normalized = _normalize(_user_profiles_df.loc[user_id])
        ratings_vector = _games_one_hot_matrix @ user_profile_normalized.T
        top_k_list = _get_top(ratings_vector, k=10)
    return top_k_list

_games_df = pd.read_csv(_GAMES_DATASET_FILENAME, index_col='game_id')
_genres_list = list(_games_df.columns[12:])
new_user_profiles()
_user_profiles_df = pd.read_csv(_USER_PROFILES_FILENAME, index_col='user_id')
_games_one_hot_df = _games_df[_genres_list].copy(deep=True)
_games_one_hot_matrix = np.array(_games_one_hot_df)
