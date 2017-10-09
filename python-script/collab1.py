####################################### 10/8 9:49 PM

import json
import glob
import os
import operator
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
        split_info = str(info).split("'")
        the_dict[split_info[15]] = int(split_info[3])

#get all of the json files and put it into a list, first user of the list is me (for now)
def get_json_files(store):
    parent_dir = 'C:/Users//bendo/Desktop/Capstone Project' #change pathname to wherever files are stored
    for json_file in glob.glob(os.path.join(parent_dir, '*.json')):
        json_split = str(json_file).split("\\")
        store.append(json_split[1])

def generate_sim_scores(my_films_store, sim_score):
    my_dict = {} ###user using website (me)
    other_dict = {} ##person to compare
    json_files_store = []

    get_json_files(json_files_store) #get all available .json files
    
    ############# me (as an example) ###########
    with open(json_files_store[0]) as data_file:
        me = json.load(data_file)
    ############################
        
    do_append(my_dict, me["films"]) ##set up my dictionary for pearson
    my_films_store[str(me["user_id"])] = me["films"] ##set up dictionary for recommender

    for i in range(1, len(json_files_store)):
        with open(json_files_store[i]) as data_file:
            other = json.load(data_file)
        other_id = str(other["user_id"]) ##0) get the user id for the other person
        do_append(other_dict, other["films"]) ##1) set up the dictionary for the other person
        sim_score[other_id] = (pearson(my_dict, other_dict)) ##2) do the pearson between the other user and me, add to the score
        other_dict.clear() ##3)clear the dictionary for the next person

    return top_person(sim_score)

#return the person most similar to me
def top_person(sim_score):
    temp_store = sorted(sim_score.items(), key=operator.itemgetter(1))
    temp_store.reverse()
    return temp_store[0][0]

#########
      
def main():
    my_films_store = {}
    sim_score = {}
    
    top_id = generate_sim_scores(my_films_store, sim_score)
    
            
if __name__ == "__main__":
    main()
