from imdb import IMDb
import requests
import re
import sqlite3
from sqlite3 import Error

top100 = "http://www.imdb.com/chart/top?ref_=nv_mv_250_6"

##a function that simply establishes a connection to a database
def create_connection():
    try:
        connection = sqlite3.connect('testdatabase.db') ##should create a .db file on your desktop
        return connection
    except Error as e:
        print(e)

    return None

##a function that prints all rows in the imdbtop100 table
def print_all_rows(connection):
    c = connection.cursor()
    for row in c.execute('SELECT * FROM top100movies ORDER BY movie_rating DESC'):
        print row

##a function that retrieves the top 100 films on imdb based on rating
def get_top100():
    the_reqs = requests.get(top100)
    the_reqs_split = the_reqs.text.split("\n")
    results = [] ##blank list to store IDs
    
    for x in the_reqs_split:
        if len(results) == 100:
            break ##for simplicity sake, we'll just use 100 movies
        x = x.rstrip("\n") ##get rid of extraneous blank spaces at the end of each query, if any
        movie = re.search('data-titleid="tt(\d+?)">', x) ##search for id
        ##utilize regular expression, all IMDB ids start with tt, followed by digits
        ##(\d+?) searches for those digits
        if movie: ##we were successful in finding the movie, append it
            the_id = movie.group(1) ##the id portion, we don't want the "data-titleid= ..."
            results.append(the_id)
            
    return results


def main():
    top100 = get_top100()
    imdb_ob = IMDb() ##imdb object

    connection = create_connection()
    c = connection.cursor()
    c.execute('''CREATE TABLE top100movies (movie_id, movie_title, movie_rating)''')

    for the_id in top100:
        movie = imdb_ob.get_movie(the_id)
        c.execute('INSERT INTO top100movies (movie_id, movie_title, movie_rating)'
                  'VALUES (?, ?, ?)', (the_id, movie['title'], movie['rating']))
        connection.commit()
        
    with connection:
        print ("SHOULD PRINT ALL ROWS: ")
        print_all_rows(connection)
    connection.close()
    

if __name__ == "__main__":
    main()


