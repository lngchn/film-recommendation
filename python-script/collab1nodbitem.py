####### 11/12/17 1:24 PM

import json  #For exporting JSON files
import glob  #For traversing directories
from math import sqrt

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
def get_user_info(imdb_ids, path_to_files, all_film_data, all_users):
    for i in range(0, len(imdb_ids)):
        imdb_id = imdb_ids[i]
        title = ""

        film_dict = {"imdb_id": imdb_id, "title": title, "users":[]}
        for filename in glob.iglob(path_to_files):
            with open(filename) as json_file:
                json_data = json.load(json_file)
            for i in json_data["films"]:
                if(i["imdb_id"] == imdb_id):
                    film_dict["users"].append({"user_id": json_data["user_id"], "rating": i["rating"]})
                    if json_data["user_id"] not in all_users: all_users.append(json_data["user_id"])
                    film_dict["title"] = i["title"]
        all_film_data[film_dict["imdb_id"]] = film_dict

def rec_movies(imdb_ids, all_film_data, all_users):
    path_to_files = 'C://Users/bendo/Desktop/Capstone Project/itemtest/*json'
    get_imdb_ids(imdb_ids, path_to_files)
    get_user_info(imdb_ids, path_to_files, all_film_data, all_users)

def pearson(r1, r2):
    top = float(r1 * r2)
    bottom = float(sqrt(pow(r1, 2) * pow(r2, 2)))
    if bottom == 0: return 0
    return float(top/bottom)

def get_pearsons(seed, all_data, sim):
    for z in seed.keys():
        for x in seed[z]["users"]:
            for y in all_data.values():
                if seed[z]["title"] == y["title"]: continue
                if x["user_id"] == y["users"][0]["user_id"]:
                    if y["title"] not in sim: sim.setdefault(y["title"], 0)
                    sim[y["title"]] = sim[y["title"]] + pearson(int(x["rating"]), int(y["users"][0]["rating"]))  

#init functions 
def main():
    imdb_ids = []
    all_film_data = {}
    all_users = []
    seed_films = {}
    sim_score = {}

    rec_movies(imdb_ids, all_film_data, all_users)
    #print all_film_data["tt1748207"][0]["user_id"] --> ur000001

    seed_films["tt3748528"] = all_film_data["tt3748528"] #Rogue One FOR TESTING PURPOSES
    seed_films["tt1375666"] = all_film_data["tt1375666"] #Inception FOR TESTING PURPOSES

    get_pearsons(seed_films, all_film_data, sim_score)

    '''for x, y in sim_score.items():
        print x, y'''
    
    
if __name__ == "__main__":
    main()
