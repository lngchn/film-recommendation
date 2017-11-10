####### 11/10/17 4:13 PM

import json  #For exporting JSON files
import glob  #For traversing directories

##dictionary in a dictionary --> film titles dictionary


#Get all the imdb_ids from a local collection of IMDb user files and save them into an array
def get_imdb_ids(imdb_ids, path_to_files):
    #for filename in glob.iglob('IMDb_User_Ratings_JSON_Output_10-26-17/*json'):
    for filename in glob.iglob(path_to_files):
        with open(filename) as json_file:
            json_data = json.load(json_file)
            for i in json_data["films"]:
                imdb_ids.append(i["imdb_id"])
                

#Grab all the user ratings (and their ids) for a given film and merge that info with the IMDb ID into a dictionary 
def get_user_info(imdb_ids, path_to_files, all_film_data):
    for i in range(0, len(imdb_ids)): #switch 10 to len(imdb_ids)
        imdb_id = imdb_ids[i]
        title = ""

        film_dict = {"imdb_id": imdb_id, "title": title, "users":[]}
        for filename in glob.iglob(path_to_files):
            with open(filename) as json_file:
                json_data = json.load(json_file)
            for i in json_data["films"]:
                if(i["imdb_id"] == imdb_id):
                    film_dict["users"].append({"user_id": json_data["user_id"], "rating": i["rating"]})
                    film_dict["title"] = i["title"]
        all_film_data[film_dict["imdb_id"]] = film_dict["users"]

def rec_movies(imdb_ids, all_film_data):
    path_to_files = 'C://Users/bendo/Desktop/Capstone Project/itemtest/*json'
    get_imdb_ids(imdb_ids, path_to_files)
    get_user_info(imdb_ids, path_to_files, all_film_data)


#init functions 
def main():
    imdb_ids = []
    all_film_data = {}

    rec_movies(imdb_ids, all_film_data)
    #print all_film_data["tt1748207"][0]["user_id"] --> ur000001
    
if __name__ == "__main__":
    main()
