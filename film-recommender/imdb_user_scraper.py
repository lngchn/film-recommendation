#10-3-17, 2:03 am

from bs4 import BeautifulSoup #For html parsing
import requests               #For handling URLs 
import re                     #For regular expresions 
import json                   #For exporting a JSON file
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
               
        except Exception as e:
            print("Exception: tt"+ str(new_user_num) + " ratings are N/A." + "\n" )
            continue
    

# Inputs full user id and page number and returns a parsed page of html content
def get_parsed_page(user_id, page_num):
    
    r = requests.get("http://www.imdb.com/user/" + user_id + "/ratings?start="+str(page_num)+"&view=compact")
    try:
        
        if r.status_code == 200:
            html = r.text
            parsed_page = BeautifulSoup(html, "lxml")
            return parsed_page
        else:
            return
        
    except:
        print("Exception: tt" + user_id + "ratings page is N/A.")
        return
       
    #finally:
        #return parsed_page
        

#Returns the the total number of films watched by a given user    
def get_film_total(parsed_page):
    #Extract the total amount of films the user has reviewed
    x = parsed_page.find('div', class_='desc')
    film_total = int(x.get('data-size')) * 250
    return film_total


#Append elements to a list a film IDs
def append_to_film_id_list(html_query, updated_list):
    for line in html_query: #Search and store film imdb film ids
        user_num = str(line.get('data-item-id'))

        try:
            int(user_num) # Test if x is an int value.
            updated_list.append( "tt" + str(user_num))
        
        except Exception as e:
            print "Exception: " + str(e)
            print "1. Move to the next user.... " + "\n"
            continue
        
#Append elements to a list of film titles or a list of film ratings 
def append_to_list(html_query, updated_list):
    for line in html_query: #Search and store film imdb film ids
        updated_list.append(line.getText(strip=True).encode("utf-8"))


#Removes TV and Video Game entries from film_data list, (TV Movies are fine)
def delete_tv_entries(film_data, type):
    for i in range(len(type) - 1, 0, -1): #for i in range(start, stop, step):
        if type[i] == "TV Episode" or type[i] == "TV Series" or type[i] == "Video Game":
            del film_data["films"][i]

def set_page_amt(page_nums, max):
  
    for i in range(0, max):
        page_nums.append(str(i * 250))
       

#Process user data
def process_user_data(url, user_num, pages_per_user):
    film_ids, titles, ratings, type = [], [], [], []
    user_id = "ur" + str(user_num) 
    film_data = {"user_id": user_id, "films":[]}
    page_nums = ['1']
    set_page_amt(page_nums, pages_per_user)
    
    i = 0
    while i < len(page_nums):  #1250 will eventually be film_total, 5 x 250 pages
    
        try:
            r = requests.get("http://www.imdb.com/user/" + user_id + "/ratings?start="+page_nums[i]+"&view=compact") 
            html = r.text
            parsed_page = BeautifulSoup(html, "lxml")
            
            id_query  = parsed_page.find_all('tr', class_="list_item")    #search for film id
            title_query = parsed_page.find_all('td', class_="title") #search for title 
            rating_query = parsed_page.find_all('td', class_="your_ratings") #search for movie rating
            type_query = parsed_page.find_all('td', class_="title_type") #search for movie rating  
            film_total = get_film_total(parsed_page) #All the films on a user's page
            
            append_to_film_id_list(id_query, film_ids)
            append_to_list(title_query, titles)
            append_to_list(rating_query, ratings)
            append_to_list(type_query, type)
            i +=1
            
        except Exception as e:
            print "Exception: " + str(e)
            print "2. Exit from this user...." + "\n"
            return
            
    #If this list is empty the script should return
    if len(film_ids) == 0:
        return 
        
    #Store the user's film watching data in a list
    for i in range(0, len(ratings)):
        film_data["films"].append({"film_id": film_ids[i], "title": titles[i], "rating": ratings[i], "type": type[i]})
        #print(film_data["films"][i])
    
    delete_tv_entries(film_data, type) #Delete all TV Episode and TV Series entries
 
    for i in range(0, len(film_data["films"])):
        print(film_data["films"][i])

    #Output user info into JSON file    
    with open(str(user_id) + ".json", "w") as output:
        json.dump(film_data, output, sort_keys=True, indent=2)
        

def main():
    init(0, 5000, 10) # user ID, total users, pages per user
    

if __name__ == "__main__":
    main()
