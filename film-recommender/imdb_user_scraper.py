#9-28-17, 12:01 am

from bs4 import BeautifulSoup #For html parsing
import requests               #For handling URLs 
import re                     #For regular expresions 
import json                   #For exporting a JSON file
#from multiprocessing import Pool

'''
# Uses a list of user ids rather than grabbing them dynamically 
def init():
    sample_users = ['1000000','0024634','0204988','12887646','1591648' ] 
    for i in range(0, len(sample_users)):
        process_user_data("http://www.imdb.com/user/ur"+sample_users[i]+"/ratings?start=1&view=compact")
'''

#Returns full user id with "ur" prefix (not used)
def get_full_user_id(url):
    user_id = re.search( "^http:\/\/[^\/]*\/[^\/]*\/([^\/]*).*", url).group(1)
    return user_id
    
#Returns just numeric portion of user id (not used)
def get_user_id(url):
    user_id = re.search( "^http:\/\/[^\/]*\/[^\/]*\/ur([\d]*).*", url).group(1)
    return user_id

#Accepts a user number and a value for max users, initializes program  
def init(new_user_num, max_users):
    for i in range(0, max_users):
        try:
            new_user_num = str(i + int(new_user_num))
            url = "http://www.imdb.com/user/ur"+new_user_num+"/ratings?start=1&view=compact"
            r = requests.get(url)
            process_user_data(url, new_user_num)
               
        except Exception as e:
            print("USER: " + new_user_num + " = N/A" +"\n")
            print(str(e))


# Inputs full user id and page number and returns a parsed page of html content
def get_parsed_page(user_id, page_num):
    try:
        r = requests.get("http://www.imdb.com/user/"+user_id+"/ratings?start="+str(page_num)+"&view=compact")
        if r.status_code == 200:
            html = r.text
            parsed_page = BeautifulSoup(html, "lxml")
        
    except Exception as e:
        print(str(e))
    
    finally:
        return parsed_page


#Returns the the total number of films watched by a given user    
def get_film_total(parsed_page):
    #Extract the total amount of films the user has reviewed
    x = parsed_page.find('div', class_='desc')
    film_total = int(x.get('data-size')) * 250
    return film_total


#Append elements to a list a film IDs
def append_to_film_id_list(html_query, updated_list):
    for line in html_query: #Search and store film imdb film ids
        updated_list.append( "tt" + str(line.get('data-item-id')))
   
        
#Append elements to a list of film titles or a list of film ratings 
def append_to_list(html_query, updated_list):
    for line in html_query: #Search and store film imdb film ids
        updated_list.append(line.getText(strip=True).encode("utf-8"))


#Process user data
def process_user_data(url, user_num):
    film_ids, titles, ratings = [], [], []
    user_id = "ur" + user_num 
    film_data = {"user_id": user_id, "films":[]}
    parsed_page = get_parsed_page(user_id, 1)
    id_query  = parsed_page.find_all('tr')    #search for film id
    title_query = parsed_page.find_all('td', class_="title") #search for title 
    rating_query = parsed_page.find_all('td', class_="your_ratings") #search for movie rating
    film_total = get_film_total(parsed_page) #All the films on a user's page

    i = 1 # page num
    for i in range(1, 750, 250):  #750 will eventually be film_total
        try:
            append_to_film_id_list(id_query, film_ids)
            append_to_list(title_query, titles)
            append_to_list(rating_query, ratings)
            
        except IndexError:
            print("Index error!")
            break
        parsed_page = get_parsed_page(user_id, i)
        
    #Store the user's film watching data in a list
    for i in range(0, len(ratings)):
        film_data["films"].append({"film_id": film_ids[i], "title": titles[i], "rating": ratings[i]})
        print(film_data["films"][i])
    
    #Output user info into JSON file    
    with open(user_id +"_film_ratings" + '.json', 'w') as output:
        json.dump(film_data, output, sort_keys=True, indent=2)
        

def main():
	init("1000000", 5000) #start user, go for 200 entries
	

if __name__ == "__main__":
    main()
