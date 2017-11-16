####### 11/16/17 2:47 PM

import json  #For exporting JSON files
import glob  #For traversing directories
from math import sqrt
from scipy import spatial
import time

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
                if(i["imdb_id"] == imdb_id):
                    film_dict[str(json_data["user_id"])] = int(i["rating"])
                    if json_data["user_id"] not in all_users: all_users.append(json_data["user_id"])
        all_film_data[imdb_id] = film_dict

def rec_movies(imdb_ids, all_film_data, all_users):
    path_to_files = 'C://Users/bendo/Desktop/Capstone Project/itemtest/*json'
    get_imdb_ids(imdb_ids, path_to_files)
    get_user_info(imdb_ids, path_to_files, all_film_data, all_users)


def get_consines(seed, all_data, sim):
    for seed_id, seed_info in seed.items():
        for imdb_id, imdb_info in all_data.items():
            if seed_id == imdb_id: continue
            if len(seed_info) > len(imdb_info):
                for user in imdb_info:
                    if user in seed_info: #multiply the ratings
                        
            
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

    print time.time() - start
    get_consines(seed_films, all_film_data, sim_score)

    '''for x, y in sim_score.items():
        print x, y'''
    
    
if __name__ == "__main__":
    main()
