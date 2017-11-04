
#11-4-17, 6:00 pm 
import json  #For exporting JSON files
import glob  #For traversing directories 


#Get all the imdb_ids from a local collection of IMDb user files and save them into an array
def get_imdb_ids(imdb_ids, path_to_files):
    #for filename in glob.iglob('IMDb_User_Ratings_JSON_Output_10-26-17/*json'):
    for filename in glob.iglob(path_to_files):
        with open(filename) as json_file:
            json_data = json.load(json_file)
            for i in json_data["films"]:
                imdb_ids.append( i["imdb_id"])
                

#Export a JSON file with all the user ratings for a given film. User ratings are paired with their IMDb user id number.  
def export_to_json(imdb_id, film_dict):
    with open(str(imdb_id) + ".json", "w") as output:
        json.dump(film_dict, output, sort_keys=True, indent=2, ensure_ascii=False) 


#Grab all the user ratings (and their ids) for a given film and merge that info with the IMDb ID into a dictionary 
def get_user_info(imdb_ids, path_to_files):
    for i in range(0, len(imdb_ids)):

        imdb_id = imdb_ids[i]
        title =""
        film_dict = {"imdb_id": imdb_id, "title": title, "users":[]}
        print "\n"+"IMDb ID: " + str(imdb_id) +"\n"
        for filename in glob.iglob(path_to_files):
            with open(filename) as json_file:
                json_data = json.load(json_file)
                for i in json_data["films"]:
                    if(i["imdb_id"] == imdb_id):
                        film_dict["users"].append({"user_id": json_data["user_id"], "rating": i["rating"] })
                        print str(  json_data["user_id"]) + ", Rating: " + str( i["rating"])
                        film_dict["title"] = i["title"]

        export_to_json(imdb_id, film_dict)
        

#init functions 
def main():
    imdb_ids = []
    path_to_files = 'four/*json' #Path to directory with JSON user files
    get_imdb_ids(imdb_ids, path_to_files)
    #print len(imdb_ids)
    get_user_info(imdb_ids, path_to_files)

    
if __name__ == "__main__":
    main()
