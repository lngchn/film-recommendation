####### 11/12/17 1:24 PM

import json  #For exporting JSON files
import glob  #For traversing directories
from math import sqrt
import time
import numpy
import multiprocessing

##dictionary in a dictionary --> film titles dictionary

'''def get_pearsons(seed, all_data, sim):
    for z in seed.keys():
        for x in seed[z]["users"]:
            for y in all_data.values():
                if seed[z]["title"] == y["title"]: continue
                if x["user_id"] == y["users"][0]["user_id"]:
                    if y["title"] not in sim: sim.setdefault(y["title"], 0)
                    sim[y["title"]] = sim[y["title"]] + pearson(int(x["rating"]), int(y["users"][0]["rating"]))'''


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
        film_dict = {}

        for filename in glob.iglob(path_to_files):
            with open(filename) as json_file:
                json_data = json.load(json_file)
            for i in json_data["films"]:
                if i["imdb_id"] == imdb_id and i["rating"] != '':
                    film_dict[str(json_data["user_id"])] = int(i["rating"])
                    if json_data["user_id"] not in all_users: all_users.append(json_data["user_id"])
        all_film_data[imdb_id] = film_dict

def rec_movies(imdb_ids, all_film_data, all_users):
    path_to_files = 'C://Users/bendo/Desktop/Capstone Project/itemtest/*json'
    get_imdb_ids(imdb_ids, path_to_files)
    get_user_info(imdb_ids, path_to_files, all_film_data, all_users)


def get_pearsons(seed, all_data, sim):
    for seed_id, seed_info in seed.items():
        for imdb_id, imdb_info in all_data.items():
            if seed_id == imdb_id: continue
            if len(seed_info) >= len(imdb_info):
                seed_r = []
                other_r = []
                for user, rating in imdb_info.items():
                    if user in seed_info:
                        other_r.append(rating)
                        seed_r.append(seed_info[user])
                if len(seed_r) == 0 or len(other_r) == 0: continue
                else: sim[imdb_id] = numpy.corrcoef(seed_r, other_r)[0, 1]
            else:
                seed_r = []
                other_r = []
                for user, rating in seed_info.items():
                    if user in imdb_info:
                        seed_r.append(rating)
                        other_r.append(imdb_info[user])
                if len(seed_r) == 0 or len(other_r) == 0: continue
                else: sim[imdb_id] = numpy.corrcoef(other_r, seed_r)[0, 1]
                        
            
#init functions 
def main():
    start = time.time()
    imdb_ids = []
    all_film_data = {}
    all_users = []
    seed_films = {}
    sim_score = {}

    rec_movies(imdb_ids, all_film_data, all_users)
    #print all_film_data["tt1748207"][0]["user_id"] --> ur000001

    seed_films["tt3748528"] = all_film_data["tt3748528"] #Rogue One FOR TESTING PURPOSES
    #seed_films["tt1375666"] = all_film_data["tt1375666"] #Inception FOR TESTING PURPOSES

    get_pearsons(seed_films, all_film_data, sim_score)
    
    
    
if __name__ == "__main__":
    main()
