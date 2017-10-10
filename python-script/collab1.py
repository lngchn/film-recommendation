####################################### 10/9/17 10:38 PM

import json
import glob
import os
import operator
import string
from math import sqrt


#calculate the pearson correlation between two users
def pearson(p1, p2):
    common_films = {}
    for movie in p1:
        if movie in p2:
            common_films[movie] = 1

    if len(common_films) == 0: return 0
    p1_sum = sum([p1.get(movie) for movie in common_films])
    p2_sum = sum([p2.get(movie) for movie in common_films])
    ########
    p1_sum_sq = sum((pow(p1.get(movie), 2) for movie in common_films))
    p2_sum_sq = sum((pow(p2.get(movie), 2) for movie in common_films))
    ########
    product_sum = sum([p1.get(movie) * p2.get(movie) for movie in common_films])
    ########
    top = product_sum - ((p1_sum * p2_sum) / len(common_films))
    bottom = sqrt((p1_sum_sq - pow(p1_sum, 2) / len(common_films)) * (p2_sum_sq - pow(p2_sum, 2) / len(common_films)))
    ########
    if bottom == 0: return
    return top/bottom  

#set up a dictionary, (movie title -> rating) for movie based on user
def do_append(the_dict, the_info):
    for info in the_info:
        str_info = str(info)
        split_info = [word.strip(string.punctuation) for word in str_info.split("'")]
        if split_info[3] == '': continue ##ignore empty ratings
        if len(split_info[14]) > 2:
            combine = split_info[14] + split_info[15]
            the_dict[combine] = int(split_info[3]) ## *** FIX THIS ISSUE *** 
        the_dict[split_info[15]] = int(split_info[3])

#get all of the json files and put it into a list, first user of the list is me (for now)
def get_json_files(store):
    parent_dir = 'C:/Users//bendo/Desktop/Capstone Project' #change pathname to wherever files are stored
    for json_file in glob.glob(os.path.join(parent_dir, '*.json')):
        json_split = str(json_file).split("\\")
        store.append(json_split[1])

##get the id of the most similar user to me
def rec_movies(sim_score):
    my_dict = {} ###user using website (me)
    other_dict = {} ##person to compare
    rankings = []
    json_files_store = []

    get_json_files(json_files_store) #get all available .json files
    
    ############# me (as an example) ###########
    with open(json_files_store[0]) as data_file:
        me = json.load(data_file)
    ############################
        
    do_append(my_dict, me["films"]) ##set up my dictionary for pearson
    #my_films_store[str(me["user_id"])] = me["films"] ##set up dictionary for recommender

    for i in range(1, len(json_files_store)):
        with open(json_files_store[i]) as data_file:
            other = json.load(data_file)
        other_id = str(other["user_id"]) ##0) get the user id for the other person
        do_append(other_dict, other["films"]) ##1) set up the dictionary for the other person
        pearson_num = (pearson(my_dict, other_dict)) ##2) get the pearson correlation between me and another user
        sim_score[other_id] = pearson_num ##3) store the similarity score
        fill_rankings(rankings, my_dict, other_dict, pearson_num) ##4) fill the rankings (for recommendation)
        other_dict.clear()

    return rankings

#return the person most similar to me
def top_person(sim_score):
    temp_store = sorted(sim_score.items(), key=operator.itemgetter(1))
    temp_store.reverse()
    return temp_store[0][0]

#essentially provides the films to recommend
#we provide weighted scores in this function, modify ratings depending on how closely correlated they are in tastes to you
def fill_rankings(rankings, my_dict, other_dict, pearson_num):
    if pearson_num <= 0: return
    temp1 = {}
    temp2 = {}
    for movie in other_dict: #we need to adjust the scores so that they're weighted
        if movie not in my_dict or my_dict[movie] == 0:
            temp1.setdefault(movie, 0)
            temp1[movie] += other_dict[movie] * pearson_num
            temp2.setdefault(movie, 0)
            temp2[movie] += pearson_num

    rankings.extend([(ranking / temp2[movie], movie) for movie, ranking in temp1.items()])
    rankings.sort()
    rankings.reverse()

#########
      
def main():
    #my_films_store = {}
    sim_score = {}
    
    films_to_rec = rec_movies(sim_score)

    print [x[1] for x in films_to_rec[:10]] #print the top 10 films 

            
if __name__ == "__main__":
    main()
