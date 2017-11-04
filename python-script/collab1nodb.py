####################################### 11/4/17 1:04 PM
####TO DO: address only 1 seed film, fix run time?, play around with count and size of what to be returned

import json
import glob
import os
import operator
import string
import requests
from imdb import IMDb
import random
import time
from time import sleep
from math import sqrt

#tmdb.API_KEY = '22b44af24d5169327b6fa06c36f89483'
ia = IMDb()


####INACTIVE FUNCTIONS#####
#return the person most similar to me (not used for now)
def top_person(sim_score):
    temp_store = sorted(sim_score.items(), key=operator.itemgetter(1))
    temp_store.reverse()
    return temp_store[0][0]
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
def do_append(the_dict, movie_id_store, the_info, all_movies, check, seed_genres):
    for info in the_info:
        str_info = str(info)
        split_info = [word.strip(string.punctuation) for word in str_info.split("'")]
        if split_info[3] == '': continue ##ignore empty ratings
        if check == 0: ##store genres for seed films only!
                temp = split_info[11][2:len(split_info[11])]
                movie = ia.get_movie(temp)
                for genre in movie['genre']:
                    if genre not in seed_genres: seed_genres.append(str(genre))
        if len(split_info[14]) > 2: ##account for special characters
            split14 = split_info[14].split('"')
            combine = split14[1] + "'" + split_info[15]
            the_dict[combine] = int(split_info[3])
            movie_id_store[combine] = split_info[11] #combine is the movie name, split_info[11] is the movie ID
            if combine not in all_movies: all_movies.setdefault(combine, 1)
            else: all_movies[combine] = all_movies[combine] + 1
        else:
            the_dict[split_info[15]] = int(split_info[3])
            movie_id_store[split_info[15]] = split_info[11] ##split_info[15] is the movie name
            if split_info[15] not in all_movies: all_movies.setdefault(split_info[15], 1)
            else: all_movies[split_info[15]] = all_movies[split_info[15]] + 1
            
#get all of the json files and put it into a list, first user of the list is me (for now)
def get_json_files(store):
    parent_dir = 'C:/Users//bendo/Desktop/Capstone Project/' #change pathname to wherever files are stored
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
        if num > 6: rankings[movie] = num

##function to remove all movies that appear less than 50 times (removes bias towards films with only less than 50 ratings)
def remove_fifty(all_movies, rankings):
    for movie, count in all_movies.items():
        if count < 100 and movie in rankings: rankings.pop(movie, 0)

def remove_non_genre(seed_genres, movie_id_store, rankings):
    temp = []
    check = 0
    for movies in rankings:
        if len(temp) == 10: break ##return the top 10
        while True:
            try:
                temp_id = movie_id_store[movies[0]][2:len(movie_id_store[movies[0]])]
                movie = ia.get_movie(temp_id)
                for genre in movie['genre']:
                    if str(genre) not in seed_genres:
                        check = 1
                        break
                if check == 1: check = 0
                else: temp.append(movies[0])
                break
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 503:
                    sleep(random.randint(3, 5)) ##to prevent server request overload
                    pass

    return temp
        
##get the id of the most similar user to me
def rec_movies(seed_genres, sim_score, movie_id_store, all_movies):
    my_dict = {} ###user using website (me)
    other_dict = {} ##person to compare
    rankings = {}
    json_files_store = []
    rating_pearson = {}
    just_pearson = {}

    get_json_files(json_files_store) #get all available .json files
    
    ############# me (as an example) ###########
    with open(json_files_store[0]) as data_file:
        me = json.load(data_file)
    ############################

    do_append(my_dict, movie_id_store, me["films"], all_movies, 0, seed_genres) ##set up my dictionary for pearson

    for i in range(1, len(json_files_store)):
        with open(json_files_store[i]) as data_file:
            other = json.load(data_file)
        other_id = str(other["user_id"]) ##0) get the user id for the other person
        do_append(other_dict, movie_id_store, other["films"], all_movies, 1, seed_genres) ##1) set up the dictionary for the other person
        pearson_num = (pearson(my_dict, other_dict)) ##2) get the pearson correlation between me and another user
        sim_score[other_id] = pearson_num ##3) store the similarity score
        if pearson_num > 0 and pearson_num < 1:
            do_weights(rankings, rating_pearson, just_pearson, my_dict, other_dict, pearson_num) ##4) get the weights (for recommendation)
            other_dict.clear()
        else: other_dict.clear()

    fill_rankings(rankings, rating_pearson, just_pearson) ##fill the rankings
    remove_fifty(all_movies, rankings) ##remove all movies with less than fifty ratings (remove the bias)
    rankings = sorted(rankings.items(), key=operator.itemgetter(1))
    rankings.reverse()
    fix_rankings = remove_non_genre(seed_genres, movie_id_store, rankings) ##remove all movies of the wrong genre

    return fix_rankings

#########
      
def main():
    start = time.time()
    movie_id_store = {}
    sim_score = {}
    all_movies = {} #used for remove_fifty
    seed_genres = []

    films_to_rec = rec_movies(seed_genres, sim_score, movie_id_store, all_movies)

    '''sim_score = sorted(sim_score.items(), key=operator.itemgetter(1))
    sim_score.reverse()
    for x in sim_score[:15]:
        print x'''

    for x in films_to_rec:
        print x, movie_id_store[x]

    print str(time.time() - start) + " seconds"
        
if __name__ == "__main__":
    main()

