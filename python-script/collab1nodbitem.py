####### 11/18/17 3:13 PM

import json  #For exporting JSON files
import glob  #For traversing directories
import math
import time
import numpy
import operator
import multiprocessing


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
    for i in range(0, len(imdb_ids)):
        imdb_id = imdb_ids[i]
        film_dict = {}

        for filename in glob.iglob(path_to_files):
            with open(filename) as json_file:
                json_data = json.load(json_file)
            for i in json_data["films"]:
                if i["imdb_id"] == imdb_id and i["rating"] != '': film_dict[str(json_data["user_id"])] = int(i["rating"])
        all_film_data[str(imdb_id)] = film_dict

def transform_data(imdb_ids, all_film_data):
    path_to_files = 'C://Users/bendo/Desktop/Capstone Project/itemtest/*json'

    get_imdb_ids(imdb_ids, path_to_files)
    start = time.time()
    get_user_info(imdb_ids, path_to_files, all_film_data)
    print "time to finish get_user_info " + str(time.time() - start) + " secs"


def get_pearsons(seed, all_data, sim):
    for seed_id, seed_info in seed.items():
        for imdb_id, imdb_info in all_data.items():
            seed_r = []
            other_r = []
            if seed_id == imdb_id: continue
            if len(seed_info) >= len(imdb_info):
                for user, rating in imdb_info.items():
                    if user in seed_info:
                        other_r.append(rating)
                        seed_r.append(seed_info[user])
                if len(seed_r) == 0 or len(other_r) == 0: continue
                elif len(seed_r) == 1 and len(other_r) == 1: continue
                else: sim[imdb_id] = numpy.corrcoef(seed_r, other_r)[0, 1]
            else:
                for user, rating in seed_info.items():
                    if user in imdb_info:
                        seed_r.append(rating)
                        other_r.append(imdb_info[user])
                if len(seed_r) == 0 or len(other_r) == 0: continue
                elif len(seed_r) == 1 and len(other_r) == 1: continue
                else: sim[imdb_id] = numpy.corrcoef(seed_r, other_r)[0, 1]

def do_weights(seed, film, film_id, pearson, rating_pearson, just_pearson):
    if film_id in seed: return
    for user, rating in film.items():
        rating_pearson.setdefault(film_id, 0)
        rating_pearson[film_id] += rating * pearson
        just_pearson.setdefault(film_id, 0)
        just_pearson[film_id] += pearson

def fill_rankings(rankings, rating_pearson, just_pearson):
    
        

def rec_movies(seed, all_data, sim):
    rating_pearson = {}
    just_pearson = {}
    rankings = {}

    for film_id, pearson in sim.items():
        do_weights(seed, all_data[film_id], film_id, pearson, rating_pearson, just_pearson) #j[0] --> film id, j[1] --> pearson

    fill_rankings(rankings, rating_pearson, just_pearson)

                        
            
#init functions 
def main():
    imdb_ids = []
    all_film_data = {}
    seed_films = {}
    sim_score = {}

    transform_data(imdb_ids, all_film_data)
    
    #####
    seed_films["tt3748528"] = all_film_data["tt3748528"] #Rogue One FOR TESTING PURPOSES
    #####
    
    get_pearsons(seed_films, all_film_data, sim_score)
    rec_movies(seed_films, all_film_data, sim_score)

    
if __name__ == "__main__":
    main()
