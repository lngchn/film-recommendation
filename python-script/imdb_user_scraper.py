#10-10-17, 8:11 pm

from bs4 import BeautifulSoup #For html parsing
import requests               #For handling URLs 
import re                     #For regular expressions 
import json                   #For exporting a JSON file
from time import sleep
#import urllib2 
#from multiprocessing import Pool


#Returns full user id with "ur" prefix (not used)
def get_full_user_id(url):
    user_id = re.search( "^http:\/\/[^\/]*\/[^\/]*\/([^\/]*).*", url).group(1)
    return user_id
    
#Returns just numeric portion of user ID (not used)
def get_user_id(url):
    user_id = re.search( "^http:\/\/[^\/]*\/[^\/]*\/ur([\d]*).*", url).group(1)
    return user_id

# If length is less than 7 add leading zeros 
def check_user_id_length(user_id_num):
    
    if(len(user_id_num) != 7):
        for i in range(len(user_id_num), 7):
            user_id_num = "0" + user_id_num
    else:
        print user_id_num + " the length of this user ID is 7."

    return user_id_num
    

#Accepts a user number and a value for max users, initializes program  
def init(new_user_num, max_users, pages_per_user):
    list_of_users =[]
    
    #Had issues generating and using the user IDs directly, decided to store them first
    for i in range(0, max_users):
        current_user = str(new_user_num + int(i))
        current_user = check_user_id_length(current_user) 
        list_of_users.append(current_user) 

    for i in range(len(list_of_users)):
        try:
            new_user_num = list_of_users[i]
            url = "http://www.imdb.com/user/ur"+str(new_user_num)+"/ratings?start=1&view=compact"
            r = requests.get(url)
            process_user_data(url, new_user_num, pages_per_user) 
               
        except requests.ConnectionError as e:
            print "Exception: " + str(e)
            print "Exception: tt"+ str(new_user_num) + " ratings are N/A." + "\n"
            continue #continue looping through list of users
    

#Append elements to a list a film IDs
def append_to_film_id_list(html_query, updated_list):
    
    for line in html_query: #Search and store film imdb film ids
        
        user_num = str(line.get('data-item-id'))

        try:
            int(user_num) # Test if user_num is an int value.
            updated_list.append( "tt" + str(user_num))
        
        except ValueError:
            print "Failure w/ value " + user_num +" for user_num "
            print "Continue to export user data.... " + "\n"
            continue

  
#Append elements to a list of film titles or a list of film ratings 
def append_to_list(html_query, updated_list):
    for line in html_query: #Search and store film imdb film ids
        updated_list.append(line.getText(strip=True).encode("utf-8"))


            
#Process user data
def process_user_data(url, user_num, pages_per_user):
    film_ids, titles, ratings, type = [], [], [], []
    user_id = "ur" + str(user_num) 
    film_data = {"user_id": user_id, "films":[]}
 
    i = 0
    #while True: # For total pages
    while i < (pages_per_user * 250):  #pages are numbered in increments of 250
        try:
            if i == 0:
                page_num = str(1)
                url = "http://www.imdb.com/user/" + user_id + "/ratings?start="+page_num+"&view=compact" 
            
            else:
                page_num = str(i)   
                url = "http://www.imdb.com/user/" + user_id + "/ratings?start="+page_num+"&view=compact"
            
            r = requests.get(url) 
            r.raise_for_status()
            html = r.text
            parsed_page = BeautifulSoup(html, "lxml")
    
            print "User: " + str(user_id) + ", Page #" + page_num 
     
            #scraping code
            id_query  = parsed_page.find_all('tr', class_="list_item")    #search for film id
            append_to_film_id_list(id_query, film_ids)
            
            #If this list is empty, the script should return, no need to go further
            #for users with pages but no ratings
            if len(film_ids) == 0:
                break 
            
            title_query = parsed_page.find_all('td', class_="title") #search for title 
            append_to_list(title_query, titles)
            
            rating_query = parsed_page.find_all('td', class_="your_ratings") #search for movie rating
            append_to_list(rating_query, ratings)
            
            type_query = parsed_page.find_all('td', class_="title_type") #search for movie rating  
            append_to_list(type_query, type)
            sleep(2)
            
            #increase page num
            i += 250  
            
        except requests.exceptions.HTTPError as e:
           
            if e.response.status_code == 404:
                print "404 Error! Page not found! For user: " + str(user_id) + "."
                break
            elif e.response.status_code == 403:
                print "403 Error! Access denied!"
                break
                
            elif e.response.status_code == 503:
                print "503 Error!"
                break
                
            else:
                print "Something happened! Error code", err.code
                break          
            
    #If this list is empty the script should return, for some reason I have to put this here also
    #Otherwise files will be generated for users with no ratings
    if len(film_ids) == 0:
        return 
        
    #Store the user's film watching data in a list
    for i in range(0, len(ratings)):
        if type[i] != "TV Episode" and type[i] != "TV Series" and type[i] != "Video Game":
            film_data["films"].append({"film_id": film_ids[i], "title": titles[i], "rating": ratings[i], "type": type[i]})
    

    for i in range(0, len(film_data["films"])):
        print film_data["films"][i] 

    #Output user info into JSON file    
    with open(str(user_id) + ".json", "w") as output:
        json.dump(film_data, output, sort_keys=True, indent=2, ensure_ascii=False)
        

def main():
    init(0, 20000, 11) # user ID, total users, pages per user
    

if __name__ == "__main__":
    main()
