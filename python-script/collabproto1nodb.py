####################################### 10/27/17 3:06 PM
####TRY TO FIX THIS

import json
import glob
import os
import operator
import string
import time
from math import sqrt
import itertools


#calculate the pearson correlation between two users
def pearson(p1, p2):
    common_films = {}
    for movie in p1:
        if movie in p2: common_films[movie] = 1

    the_length = float(len(common_films))
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
def do_append(the_dict, movie_id_store, the_info):
    for info in the_info:
        str_info = str(info)
        split_info = [word.strip(string.punctuation) for word in str_info.split("'")]
        if split_info[3] == '': continue ##ignore empty ratings
        if len(split_info[14]) > 2:
            split14 = split_info[14].split('"')
            combine = split14[1] + "'" + split_info[15]
            the_dict[combine] = int(split_info[3])
            if combine not in movie_id_store: movie_id_store[combine] = split_info[11] 
        else:
            the_dict[split_info[15]] = int(split_info[3])
            if split_info[15] not in movie_id_store: movie_id_store[split_info[15]] = split_info[11]
        
#get all of the json files and put it into a list, first user of the list is me (for now)
def get_json_files(store):
    parent_dir = 'C:/Users//bendo/Desktop/Capstone Project/' #change pathname to wherever files are stored
    for json_file in glob.glob(os.path.join(parent_dir, '*.json')):
        json_split = str(json_file).split("\\")
        store.append(json_split[1])

##get the id of the most similar user to me
def rec_movies(sim_score, movie_id_store):
    my_dict = {} ###user using website (me)
    other_dict = {} ##person to compare
    rankings = []
    json_files_store = []
    rating_pearson = {}
    just_pearson = {}

    get_json_files(json_files_store) #get all available .json files
    
    ############# me (as an example) ###########
    with open(json_files_store[0]) as data_file:
        me = json.load(data_file)
    ############################
        
    do_append(my_dict, movie_id_store, me["films"]) ##set up my dictionary for pearson
    #my_films_store[str(me["user_id"])] = me["films"] ##set up dictionary for recommender

    for i in range(1, len(json_files_store)):
        with open(json_files_store[i]) as data_file:
            other = json.load(data_file)
        other_id = str(other["user_id"]) ##0) get the user id for the other person
        do_append(other_dict, movie_id_store, other["films"]) ##1) set up the dictionary for the other person
        pearson_num = (pearson(my_dict, other_dict)) ##2) get the pearson correlation between me and another user
        if pearson_num > 0 and pearson_num < 1:
            sim_score[other_id] = pearson_num ##3) store the similarity score
            do_weights(rating_pearson, just_pearson, my_dict, other_dict, pearson_num) ##4) get the weights (for recommendation)
            fill_rankings(rankings, rating_pearson, just_pearson) ##fill the rankings
            other_dict.clear()
        else: other_dict.clear()

    fix_rankings = list(set(rankings)) #remove the duplicates
    fix_rankings = sorted(fix_rankings, key=operator.itemgetter(0))
    fix_rankings.reverse()
    
    return fix_rankings
    
#return the person most similar to me (not used for now)
def top_person(sim_score):
    temp_store = sorted(sim_score.items(), key=operator.itemgetter(1))
    temp_store.reverse()
    return temp_store[0][0]

#essentially provides the films to recommend
#we provide weighted scores in this function, modify ratings depending on how closely correlated they are in tastes to you
def do_weights(rating_pearson, just_pearson, my_dict, other_dict, pearson_num):
    for movie in other_dict: #we need to adjust the scores so that they're weighted
        if movie not in my_dict or my_dict[movie] == 0:
            if movie not in rating_pearson: rating_pearson.setdefault(movie, 0)
            rating_pearson[movie] += other_dict[movie] * pearson_num
            if movie not in just_pearson: just_pearson.setdefault(movie, 0)
            just_pearson[movie] += pearson_num

##fill the rankings list to be returned as recommendations
def fill_rankings(rankings, rating_pearson, just_pearson):
    for movie, ranking in rating_pearson.items():
        num = ranking / just_pearson[movie]
        if num > 9:
            rankings.extend([(num, movie)])

#########
      
def main():
    #my_films_store = {}
    movie_id_store = {}
    sim_score = {}

    films_to_rec = rec_movies(sim_score, movie_id_store)

    '''sim_score = sorted(sim_score.items(), key=operator.itemgetter(1))
    sim_score.reverse()
    for x in sim_score[:15]:
        print x'''
    
    '''for x in films_to_rec[:15]:
        print x[0], movie_id_store[x[1]] + " <-- " + x[1]'''

    for x in films_to_rec:
        print x[0], x[1]

            
if __name__ == "__main__":
    main()