#11-12-17, 9:27 pm
#Test script for receiving a JSON obbject.
#Receives data from the Node.js script 'send_json_obj.js'.
#The code here will be incorporated into our collabrative filtering Python scripts.  

import sys, json

#read in data from Node.js
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

#init and manipulate the data within the imported JSON object.
def init():
    user_obj = read_in()    
    user_id = user_obj["user_id"]
    imdb_dict = {} 
 
    for i in range(0, len(user_obj["films"])):
      x = user_obj["films"][i]
      imdb_dict[str(x["id"])] = x["imdb_id"]
      print(imdb_dict)

#Output each imdb id one by one.
#The Node.js that called this file will store each id and return it to the server.
#For the purposes of this example, each id will only be printed to the terminal. 
# def output_data(imdb_dict):
#     for i in imdb_dict:
#       print (imdb_dict[i])
    
def main():
    init()
   

if __name__ == '__main__':
    main()