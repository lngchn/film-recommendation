####################################### 11/15/17 12:03 PM

import sys
import json
import glob
import os
import operator
import string
import requests
import random
import time
from time import sleep
from math import sqrt

####INACTIVE FUNCTIONS#####
'''#return the person most similar to me (not used for now)
def top_person(sim_score):
    temp_store = sorted(sim_score.items(), key=operator.itemgetter(1))
    temp_store.reverse()
    return temp_store[0][0]
##function to remove movies that do not match the seed films' genres
def remove_non_genre(seed_genres, movie_id_store, rankings):
    temp = {}
    for movies in rankings:
        if len(temp) == 10: break ##return the top 10
        while True:
            try: 
                temp_id = movie_id_store[movies[0]][2:len(movie_id_store[movies[0]])]
                if temp_id == '': continue ##ignore invalid ids
                movie = ia.get_movie(temp_id)
                if movie['genre'][0] or movie['genre'][1] not in seed_genres: break
                else:
                    temp[movies[0]] = movies[1]
                    break
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 10054:
                    sleep(random.randint(2,4))
                    pass
            
    return temp'''

'''if check == 0: ##store genres for seed films only!
                temp = split_info[15][2:len(split_info[15])]
                movie = ia.get_movie(temp)
                for genre in movie['genre']:
                    if genre not in seed_genres: seed_genres.append(str(genre))'''
##############################

#calculate the pearson correlation between two users UNLESS only one seed film --> euclidean
#pearson ALWAYS returns 1 if there is only one value, which is bad because I'm ignoring perfect pearsons
def pearson(p1, p2):
    common_films = {}
    for movie in p1:
        if movie in p2: common_films[movie] = 1

    if len(common_films) == 0: return 0
    cfp1 = [p1.get(movie) for movie in common_films]
    cfp2 = [p2.get(movie) for movie in common_films]

    if len(set(cfp1)) == 1 and len(set(cfp2)) == 1: return 0
    if cfp1.sort() == cfp2.sort(): return 1.0

    return numpy.corrcoef(cfp1, cfp2)[0, 1]

#set up a dictionary, (movie title -> rating) for movie based on user
#also, sets up dictionary for movie ids (movie title -> ID) for movie_id_store
def do_append(the_dict, movie_id_store, the_info, all_movies):
    for info in the_info:
        if info["rating"] == '': continue
        the_dict[info["title"]] = int(info["rating"])
        movie_id_store[info["title"]] = info["imdb_id"]
        if info["title"] not in all_movies: all_movies.setdefault(info["title"], 1)
        else: all_movies[info["title"]] = all_movies[info["title"]] + 1
            
#get all of the json files and put it into a list, first user of the list is me (for now)
def get_json_files(store):
    parent_dir = os.path.dirname(__file__)
    json_file = glob.glob(os.path.join(parent_dir, '../IMDb_User_Ratings/*.json'))
    for file in json_file:
        # json_split = str(file).split("\\")
        # print(json_split)
        store.append(file)

#essentially provides the films to recommend
#we provide weighted scores in this function, modify ratings depending on how closely correlated they are in tastes to you
def do_weights(rankings, rating_pearson, just_pearson, my_dict, other_dict, pearson_num):
    for movie in other_dict: #we need to adjust the scores so that they're weighted
        if movie not in my_dict or my_dict[movie] == 0:
            rating_pearson.setdefault(movie, 0)
            rating_pearson[movie] += other_dict[movie] * pearson_num
            just_pearson.setdefault(movie, 0)
            just_pearson[movie] += pearson_num

##fill the rankings list to be returned as recommendations
def fill_rankings(rankings, rating_pearson, just_pearson):
    for movie, ranking in rating_pearson.items():
        num = ranking / just_pearson[movie]
        if num > 7 and num <= 10: rankings[movie] = num

##function to remove all movies that appear less than 50 times (removes bias towards films with only less than 50 ratings)
def remove_fifty(all_movies, rankings):
    for movie, count in all_movies.items():
        if count < 400 and movie in rankings: rankings.pop(movie, 0)
        
##get the id of the most similar user to me
def rec_movies(me, sim_score, movie_id_store, all_movies):
    my_dict = {} ###user using website (me)
    other_dict = {} ##person to compare
    rankings = {}
    json_files_store = []
    rating_pearson = {}
    just_pearson = {}
    movies_store = {}

    get_json_files(json_files_store) #get all available .json files
    
    ############# me (as an example) ###########
    #with open(json_files_store[0]) as data_file:
        #me = json.load(data_file)
    ############################

    do_append(my_dict, movie_id_store, me, all_movies) ##set up my dictionary for pearson
    #if len(me) > 0: rating = me[0]["rating"] #for lack of variance in input data
    for i in range(0, len(json_files_store)):
        with open(json_files_store[i], encoding="utf8") as data_file:
            other = json.load(data_file) #1) get the .json file data, store as object
            other_id = str(other["user_id"]) #2) get the ID from the .json file object
            do_append(other_dict, movie_id_store, other["films"], all_movies) #3) do_append (see above)
            pearson_num = pearson(my_dict, other_dict) #4) get the pearson correlation between my movies and the other person's movies
            if pearson_num > 0 and pearson_num <= 1: #5) ignore pearsons less than or equal to 0, greater than 1
                sim_score[other_id] = pearson_num
                movies_store[other_id] = other_dict.copy()
            other_dict.clear()

    sim_score = sorted(sim_score.items(), key=operator.itemgetter(1))
    sim_score.reverse()

    for j in range(0, 11): #we only care about the top ten pearsons
        # print (sim_score[j][0], sim_score[j][1])
        do_weights(rankings, rating_pearson, just_pearson, my_dict, movies_store[sim_score[j][0]], sim_score[j][1])   
    
    fill_rankings(rankings, rating_pearson, just_pearson) ##fill the rankings
    remove_fifty(all_movies, rankings) ##remove all movies with less than fifty ratings (remove the bias)
    rankings = sorted(rankings.items(), key=operator.itemgetter(1))
    rankings.reverse()

    return rankings

#read in user_obj data
def read_in():
    user_obj = sys.stdin.readlines()

    return json.loads(user_obj[0])

#########
      
def main():
    user_obj = read_in() 
    movie_id_store = {}
    sim_score = {}
    all_movies = {} #used for remove_x
    output_str = ""
 
    films_to_rec = rec_movies(user_obj["films"], sim_score, movie_id_store, all_movies)
    
    for x in films_to_rec[:100]:
        output_str += movie_id_store[x[0]] + " "

    print (output_str)
        
if __name__ == "__main__":
    main()
