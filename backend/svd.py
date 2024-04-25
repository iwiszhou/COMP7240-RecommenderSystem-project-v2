import json
import csv
import pandas as pd
from surprise import Dataset
from surprise import accuracy
from surprise import SVD
from surprise.model_selection import train_test_split
from surprise.model_selection import cross_validate
from collections import defaultdict
from surprise import Reader
from surprise import Dataset

ratings_train_data = 'data/user_rating_train.csv'

epochs = 10
factors = 100
reader = Reader(rating_scale=(1, 5))
trainset = pd.read_csv(ratings_train_data)
data = Dataset.load_from_df(trainset[['user_id', 'game_id', 'rating']], reader)
transet_svd = data.build_full_trainset()

# Create an SVD model
model = SVD(verbose=True, n_epochs=epochs, n_factors=factors)


def get_top_n_recommendations(model, user_id, transet_svd ,n=10, rated_items=[]):
    # Get a list of all items the user has rated

    # Predict ratings for all items
    predictions = []
    for item_id in transet_svd.all_items():
        raw_item_id = transet_svd.to_raw_iid(item_id)
        if str(raw_item_id) not in rated_items:
            predicted_rating = model.predict(user_id, raw_item_id).est
            predictions.append((str(raw_item_id), predicted_rating))
    # Sort predictions by predicted rating in descending order
    predictions.sort(key=lambda x: x[1], reverse=True)

    # Return top N recommendations
    return predictions[:n]


def predict(user_profile_json, ab_test_mode):
    if ab_test_mode == 'B':
        k=20
    else
        k=10
    user_profiles = user_profile_json
    rated_game_ids = []

    # Get the list of rated game IDs
    rated_game_ids = [profile['game_id'] for profile in user_profiles]

    # update user profile to trainset CSV
    updateCSV(ratings_train_data, user_profile_json)

    trainset = pd.read_csv(ratings_train_data)
    data = Dataset.load_from_df(trainset[['user_id', 'game_id', 'rating']], reader)

    transet_svd = data.build_full_trainset()
    print(transet_svd)

    model = SVD(verbose=True, n_epochs=epochs, n_factors=factors)
    model.fit(transet_svd)
    user_id = ""
    for item in user_profiles:
        user_id = item['user_id']

    # Get top 10 recommendations for the new user(if B mode for 20 recommendations(B test only))
    recommendations = get_top_n_recommendations(model, user_id, transet_svd, n=k, rated_items=rated_game_ids )

    # Extract game IDs from predictions
    game_ids = [str(game_id)[:-2] for (game_id, _) in recommendations]

    # Convert game IDs to JSON array
    #game_ids_json = json.dumps(game_ids)

    #return game_ids_json
    # Convert string to int
    game_ids_int = [int(i) for i in game_ids]

    return game_ids_int

def updateCSV(csv_file,user_profile_json):
    user_profiles = user_profile_json
    with open(csv_file, 'a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=user_profiles[0].keys())
        writer.writerows(user_profiles)