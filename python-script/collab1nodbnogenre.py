####################################### 11/10/17 11:45 AM

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

#tmdb.API_KEY = '22b44af24d5169327b6fa06c36f89483'


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


#calculate the pearson correlation between two users
def pearson(p1, p2):
    common_films = {}
    for movie in p1:
        if movie in p2: common_films[movie] = 1

    the_length = len(common_films)
    if the_length == 0: return 0
    p1_sum = sum([p1.get(movie) for movie in common_films])
    p2_sum = sum([p2.get(movie) for movie in common_films])
    ########
    p1_sum_sq = sum((pow(p1.get(movie), 2) for movie in common_films))
    p2_sum_sq = sum((pow(p2.get(movie), 2) for movie in common_films))
    ########
    product_sum = sum([p1.get(movie) * p2.get(movie) for movie in common_films])
    ########
    top = product_sum - ((p1_sum * p2_sum) / the_length)
    bottom = sqrt((p1_sum_sq - pow(p1_sum, 2) / the_length) * (p2_sum_sq - pow(p2_sum, 2) / the_length))
    ########
    if bottom == 0: return 0
    return top/bottom  

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
    parent_dir = 'C://Users/bendo/Desktop/Capstone Project/IMDb_User_Ratings_JSON_Output_11-4-17/' #change pathname to wherever files are stored
    for json_file in glob.glob(os.path.join(parent_dir, '*.json')):
        json_split = str(json_file).split("\\")
        store.append(json_split[1])

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
        if num > 7 and num < 10: rankings[movie] = num

##function to remove all movies that appear less than 50 times (removes bias towards films with only less than 50 ratings)
def remove_fifty(all_movies, rankings):
    for movie, count in all_movies.items():
        if count < 100 and movie in rankings: rankings.pop(movie, 0)
        
##get the id of the most similar user to me
def rec_movies(sim_score, movie_id_store, all_movies):
    my_dict = {} ###user using website (me)
    other_dict = {} ##person to compare
    rankings = {}
    json_files_store = []
    rating_pearson = {}
    just_pearson = {}
    movies_store = {}

    get_json_files(json_files_store) #get all available .json files
    
    ############# me (as an example) ###########
    with open(json_files_store[0]) as data_file:
        me = json.load(data_file)
    ############################

    do_append(my_dict, movie_id_store, me["films"], all_movies) ##set up my dictionary for pearson

    for i in range(1, len(json_files_store)):
        with open(json_files_store[i]) as data_file:
            other = json.load(data_file) #1) get the .json file data, store as object
        other_id = str(other["user_id"]) #2) get the ID from the .json file object
        do_append(other_dict, movie_id_store, other["films"], all_movies) #3) do_append (see above)
        pearson_num = pearson(my_dict, other_dict) #4) get the pearson correlation between my movies and the other person's movies
        if pearson_num > 0 and pearson_num < 1: #5) ignore pearsons less than or equal to 0, greater than or equal to 1
            sim_score[other_id] = pearson_num
            movies_store[other_id] = other_dict.copy()
        other_dict.clear()

    sim_score = sorted(sim_score.items(), key=operator.itemgetter(1))
    sim_score.reverse()

    for j in range(0, 11): #we only care about the top ten pearsons
        do_weights(rankings, rating_pearson, just_pearson, my_dict, movies_store[sim_score[j][0]], sim_score[j][1])   
    
    fill_rankings(rankings, rating_pearson, just_pearson) ##fill the rankings
    remove_fifty(all_movies, rankings) ##remove all movies with less than fifty ratings (remove the bias)
    rankings = sorted(rankings.items(), key=operator.itemgetter(1))
    rankings.reverse()

    return rankings

#########
      
def main():
    start = time.time()
    movie_id_store = {}
    sim_score = {}
    all_movies = {} #used for remove_x

    films_to_rec = rec_movies(sim_score, movie_id_store, all_movies)

    '''sim_score = sorted(sim_score.items(), key=operator.itemgetter(1))
    sim_score.reverse()
    for x in sim_score[:5]:
        print x'''

    for x in films_to_rec[:100]:
        print x[0], movie_id_store[x[0]], x[1]

    print str(time.time() - start) + " seconds"
        
if __name__ == "__main__":
    main()
