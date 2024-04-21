import pandas as pd

df = pd.read_csv("steam_games_with_one_hot.csv")

UI_MAX_RECORDS = 20

# Helper functions
def remove_special_character(x):
    return x.replace('\xa0\r\n\t\t\t\t\t\t\t\t\t', "")

def create_game_image_url(game_id):
    return "https://cdn.cloudflare.steamstatic.com/steam/apps/"+game_id+"/header.jpg?t=1709724676"

def to_json(df, top_x_records):
    col_names = ["url", "name", "all_reviews_score", "developer"]
    if(len(df) < top_x_records):
        selected_columns_df = df.loc[:, col_names]
    else:
        selected_columns_df = df.loc[:top_x_records, col_names]
    
    # Todo - Hard code the ID column. Remove this line when dataframe is ready
    selected_columns_df['id'] = selected_columns_df.apply(lambda x: x['url'].split('/')[-3], axis=1)

    # Create a new column img, so UI can display the Image
    selected_columns_df['img'] = selected_columns_df.apply(lambda x:create_game_image_url(x['id']), axis=1)

    json_result = selected_columns_df.to_json(orient='records')
    # print(json_result)
    return json_result
# End Helper functions

# Return list of tags from csv file
def get_all_gaming_tags():
    gaming_tags = df.columns.values[15:]
    gaming_tags = [remove_special_character(x) for x in gaming_tags]
    return gaming_tags

# Return a json object contains list of game ids
def filter_games_by_ids(ids=[], game_id_column_name="Unnamed: 0", top_x_records=UI_MAX_RECORDS):
    # Filter DataFrame based on whether the id column's value is in id_list
    filtered_df = df[df[game_id_column_name].isin(ids)]
    return to_json(filtered_df, top_x_records)

# Return a json object contains list of filter games contains the input tags
def filter_games_by_tags(tags=[], top_x_records=UI_MAX_RECORDS):
    # tags = ['FPS', 'Shooter']

    if(len(tags) == 0 ):
        return to_json(df, top_x_records)

    if(len(tags)<=1):
        tags_join = tags[0]
    else:
        tags_join = "|".join(tags)
    filtered_df = df[df["popular_tags"].str.contains(tags_join)]
    return to_json(filtered_df, top_x_records)
