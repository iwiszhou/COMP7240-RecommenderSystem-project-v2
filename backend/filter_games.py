import pandas as pd

df = pd.read_csv("steam_games_with_one_hot.csv")

# Helper functions
def remove_special_character(x):
    return x.replace('\xa0\r\n\t\t\t\t\t\t\t\t\t', "")

def to_json(df, top_x_records):
    if(len(df) < top_x_records):
        selected_columns_df = df.loc[:, ["Unnamed: 0", "url", "name", "all_reviews_score"]]
    else:
        selected_columns_df = df.loc[:top_x_records, ["Unnamed: 0", "url", "name", "all_reviews_score"]]
    json_result = selected_columns_df.to_json(orient='records')
    print(json_result)
    return json_result
# End Helper functions

# Return list of tags from csv file
def get_all_gaming_tags():
    gaming_tags = df.columns.values[15:]
    gaming_tags = [remove_special_character(x) for x in gaming_tags]
    return gaming_tags

# Return a json object contains list of game ids
def filter_games_by_ids(ids=[], game_id_column_name="Unnamed: 0", top_x_records=30):
    # Filter DataFrame based on whether the id column's value is in id_list
    filtered_df = df[df[game_id_column_name].isin(ids)]
    return to_json(filtered_df, top_x_records)

# Return a json object contains list of filter games contains the input tags
def filter_games_by_tags(tags=[], top_x_records=30):
    # tags = ['FPS', 'Shooter']
    tags_join = "|".join(tags)
    filtered_df = df[df["popular_tags"].str.contains(tags_join)]
    return to_json(filtered_df, top_x_records)
