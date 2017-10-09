#10-9-17, 1:22 am
from bs4 import BeautifulSoup #For html parsing
import requests               #For handling URLs 
import re                     #For regular expressions 
import json                   #For exporting a JSON file


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
            continue #continue looping through list of users
    

# Inputs full user id and page number and returns a parsed page of html content
def get_parsed_page(user_id, page_num):
    
    r = requests.get("http://www.imdb.com/user/"+user_id+"/ratings?start="+str(page_num)+"&view=compact")
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
            int(user_num) # Test if user_num is an int value.
            updated_list.append( "tt" + str(user_num))
        
        except ValueError:
            print("Failure w/ value " + user_num +" for user_num ")
            print "1. Continue to export user data.... " + "\n"
            continue
            
        
#Append elements to a list of film titles or a list of film ratings 
def append_to_list(html_query, updated_list):
    for line in html_query: #Search and store film imdb film ids
        updated_list.append(line.getText(strip=True).encode("utf-8"))


#Set the page numbers for IMDb for sequential scraping, values our 1 to i * 250
def set_page_amt(page_nums, max):
    page_nums.append('1') #Manually add 1 as our first value, IMDb's page value starts at 1 and then increase by multiples of 250
    for i in range(1, max):
        page_nums.append(str(i * 250))
 

#Process user data
def process_user_data(url, user_num, pages_per_user):
    film_ids, titles, ratings, type = [], [], [], []
    user_id = "ur" + str(user_num) 
    film_data = {"user_id": user_id, "films": []}
    page_nums = [] 
    set_page_amt(page_nums, pages_per_user) # Fill the page num list with values that our multiples of 250
    dict = {}
    
    for i in range(0, len(page_nums)): #1250 will eventually be film_total, 5 x 250 pages
        try:
            r = requests.get("http://www.imdb.com/user/" + user_id + "/ratings?start="+page_nums[i]+"&view=compact") 
            html = r.text
            parsed_page = BeautifulSoup(html, "lxml")
            
            id_query  = parsed_page.find_all('tr', class_="list_item")  #search for film id
            title_query = parsed_page.find_all('td', class_="title") #search for title 
            rating_query = parsed_page.find_all('td', class_="your_ratings") #search for movie rating
            type_query = parsed_page.find_all('td', class_="title_type") #search for movie rating  
            film_total = get_film_total(parsed_page) #All the films on a user's page

            append_to_film_id_list(id_query, film_ids)
            append_to_list(title_query, titles)
            append_to_list(rating_query, ratings)
            append_to_list(type_query, type)
  

        except Exception as e:
            print "Exception: " + str(e)
            print  user_id + " ratings content is out of range." + "\n"
            break
            
            
    #If this list is empty the script should return
    if len(film_ids) == 0:
        return 
    
    #Set up key and attributes in dict
    for i in range(0, len(film_ids)):
    	if type[i] != "TV Episode" and type[i] != "TV Series" and type[i] != "Video Game":
    		dict[film_ids[i]] = ({"title": titles[i], "rating":ratings[i], "type": type[i]})
        
    #Append dict to films location
    for item in [dict]: 
        film_data['films'].append(item) 
  
   
    # print 
    for line in film_data["films"]:
        print line

    #Output user info into JSON file    
    with open(str(user_id) + ".json", "w") as output:
        json.dump(film_data, output, sort_keys=True, indent = 2, ensure_ascii=False)
  

def main():
    init(0, 5000, 11) # user ID, total users, pages per user
    

if __name__ == "__main__":
    main()
