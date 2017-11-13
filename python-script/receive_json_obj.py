#11-12-17, 9:27 pm
#Test script for receiving a JSON obbject.
#Receives data from the Node.js script 'send_json_obj.js'.
#The code here will be incorporated into our collabrative filtering Python scripts.  

import sys, json

#read in user_obj data
def read_in():
    user_obj = json.load(sys.stdin) 

    #Uncomment the following line to test locally without the a node.js file
    #user_obj = {"films":[{"id":297762,"imdb_id":"tt0451279","title":"Wonder Woman","poster_path":"/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg"},{"id":346364,"imdb_id":"tt1396484","title":"It","poster_path":"/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"},{"id":13640,"imdb_id":"tt0934706","title":"Superman: Doomsday","poster_path":"/3of4nShmv1hBmrebOQqGlfZ9ZL0.jpg"},{"id":1726,"imdb_id":"tt0371746","title":"Iron Man","poster_path":"/848chlIWVT41VtAAgyh9bWymAYb.jpg"},{"id":272,"imdb_id":"tt0372784","title":"Batman Begins","poster_path":"/dr6x4GyyegBWtinPBzipY02J2lV.jpg"},{"id":34127,"imdb_id":"tt0038260","title":"Wonder Man","poster_path":"/uvvdbVmk04jNFH0Zl3qsgAIsAXa.jpg"},{"id":315635,"imdb_id":"tt2250912","title":"Spider-Man: Homecoming","poster_path":"/kY2c7wKgOfQjvbqe7yVzLTYkxJO.jpg"},{"id":588,"imdb_id":"tt0384537","title":"Silent Hill","poster_path":"/4Zz9cF8S4E7DITosNYh3spybYJb.jpg"},{"id":1576,"imdb_id":"tt0120804","title":"Resident Evil","poster_path":"/5jdvEi57WBGuI5n2drG8FLAbYDp.jpg"},{"id":293660,"imdb_id":"tt1431045","title":"Deadpool","poster_path":"/inVq3FRqcYIRl2la8iZikYYxFNR.jpg"}], "user_id":"5a024f9b60375008f87cfe07" }
    
    return user_obj

#init and manipulate the data within the imported JSON object.
def init():
    user_obj = read_in()    
    user_id = user_obj["user_id"]
    imdb_dict = {} 
 
    for i in range(0, len(user_obj["films"])):
      x = user_obj["films"][i]
      imdb_dict[str(x["id"])] = x["imdb_id"]
    output_data(imdb_dict)


#Output each imdb id one by one.
#The Node.js that called this file will store each id and return it to the server.
#For the purposes of this example, each id will only be printed to the terminal. 
def output_data(imdb_dict):
    for i in imdb_dict:
      print imdb_dict[i]
    

def main():
    init()
   

if __name__ == '__main__':
    main()