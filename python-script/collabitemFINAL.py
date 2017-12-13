####### 11/24/17 3:07 PM

import json  #For exporting JSON files
import glob  #For traversing directories
import math
import time
import numpy
import operator
import sys
import os

numpy.seterr(divide='ignore', invalid='ignore') #ignore "divide by NaN" warning

####################### INACTIVE FUNCTIONS #################
'''#Get all the imdb_ids from a local collection of IMDb user files and save them into an array
def get_imdb_ids(imdb_ids, path_to_files):
    for filename in path_to_files:
        with open(filename, encoding="utf8") as json_file:
            json_data = json.load(json_file)
            for i in json_data["films"]:
                if i["imdb_id"] not in imdb_ids: imdb_ids.append(i["imdb_id"])'''
############################################################
                
#Grab all the user ratings (and their ids) for a given film and merge that info with the IMDb ID into a dictionary 
def get_user_info(path_to_files, all_film_data):
    for filename in path_to_files:
        with open(filename, encoding="utf8") as json_file:
            json_data = json.load(json_file)
            for i in json_data["films"]:
                if i["rating"] == '': continue
                if i["imdb_id"] in all_film_data: all_film_data[i["imdb_id"]].update({str(json_data["user_id"]): int(i["rating"])})
                else: all_film_data[i["imdb_id"]] = {str(json_data["user_id"]): int(i["rating"])}

#remove movies with less than 10 user ratings, since they may affect weighted pearson
def remove_few(all_film_data):
    all_film_data_copy = all_film_data.copy()
    for imdb_id, user_info in all_film_data_copy.items():
        if len(all_film_data_copy[imdb_id]) < 200: all_film_data.pop(imdb_id, None)

#transform .json file from user --> films to film --> users 
def transform_data(all_film_data):
    parent = os.path.dirname(__file__)
    path_to_files = glob.glob(os.path.join(parent, '../IMDb_User_Ratings/*.json'))
    get_user_info(path_to_files, all_film_data)
    remove_few(all_film_data)

#pearson calculation
def get_pearsons(seed, all_data, sim):
    for seed_id, seed_info in seed.items():
        for imdb_id, imdb_info in all_data.items():
            if seed_id == imdb_id: continue #ignore the seed films
            seed_r = []
            other_r = []
            if len(seed_info) >= len(imdb_info): #save runtime, compare only the smaller list
                for user, rating in imdb_info.items():
                    if user in seed_info:
                        other_r.append(rating)
                        seed_r.append(seed_info[user])
            else:
                for user, rating in seed_info.items():
                    if user in imdb_info:
                        seed_r.append(rating)
                        other_r.append(imdb_info[user])
            if len(seed_r) == 0 or len(other_r) == 0: continue ##ignore empty lists
            elif len(set(seed_r)) == 1 and len(set(other_r)) == 1: continue ##ignore lists where there is only one rating in each list
            elif numpy.corrcoef(seed_r, other_r)[0, 1] <= 0: continue
            else: sim[imdb_id] = numpy.corrcoef(seed_r, other_r)[0, 1] ##calculate the pearson

#apply the weights to the pearson values
def do_weights(seed, film, film_id, pearson, rating_pearson, just_pearson):
    if film_id in seed: return
    for user, rating in film.items():
        rating_pearson.setdefault(film_id, 0)
        rating_pearson[film_id] += rating * pearson
        just_pearson.setdefault(film_id, 0)
        just_pearson[film_id] += pearson

#fill the recommendation films, ignore everything below 7, greater than 9
def fill_rankings(rankings, rating_pearson, just_pearson):
    for movie, ranking in rating_pearson.items():
        num = ranking / just_pearson[movie]
        if num >= 7 and num <= 9: rankings[movie] = num
        
def rec_movies(seed, all_data, sim):
    rating_pearson = {}
    just_pearson = {}
    rankings = {}

    for film_id, pearson in sim.items():
        do_weights(seed, all_data[film_id], film_id, pearson, rating_pearson, just_pearson) #j[0] --> film id, j[1] --> pearson

    fill_rankings(rankings, rating_pearson, just_pearson)

    rankings = sorted(rankings.items(), key=operator.itemgetter(1))
    rankings.reverse()

    return rankings

#read in user_obj data
def read_in():
    user_obj = sys.stdin.readlines()

    return json.loads(user_obj[0])
          
#init functions 
def main():
    user_obj = read_in()
    all_film_data = {}
    seed_films = {}
    sim_score = {}
    output_str = ""

    transform_data(all_film_data)

    for x in user_obj["films"]:
        seed_films[x["imdb_id"]] = all_film_data[x["imdb_id"]]
        
    get_pearsons(seed_films, all_film_data, sim_score)
    films_to_rec = rec_movies(seed_films, all_film_data, sim_score)

    for x in films_to_rec[:200]:
        output_str += str(x[0]) + " "

    print (output_str)

if __name__ == "__main__":
    main()
