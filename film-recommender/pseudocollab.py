'''TO DO: need a dataset of json files acquired from TMDB/IMDB
1) 5,000 users+ from IMDB, 10,000+ films from IMDB
2) schema of database --> random IMDB users with ratings of films
^^^ use Kwabena's code?
3)  euclidean vs. manhattan vs. pearson correlation (will probably use this)
3a) euclidean between two points: square root of summation of (x1 - y1)^2
    --> better than manhattan but still too basic
3b) manhattan is the absolute value of the summation of x1 - y1 --> too basic
3c) pearson's --> calculate r-value, complicated formula that I will need to implement
3d) hamming distance? --> may not be relevant
3e) jaccard distance? --> may look into this, may be way too complicated but seems most precise
'''

'''TO DO: calculate similarity "score" between movies using pearson's correlation (best choice thus far)
parameters: two people
p1 -> person1, the person currently using the website
p2 -> person2, people in the database (we will compare person1 to everyone in the
database
'''
def s_score(p1, p2):
    ##TO DO: we should check to see if person1 and person2 have any common films
    ##if they don't, break the function (return 0)
    ##if they do:
        ## calculate the pearson's correlation between the two people

'''TO DO: create a function that displays similar users to person1
parameters: person1 (you or whoever is using the website), # of users in the database
'''

def s_users(p1, database_ppl):
    ##TO DO: have the most similar users to person1 "bubble up" to the top of a list/database?
        ##will need to think how to do this
    ##should, in the end, return similar users to person1, disregard those who aren't similar
        ##cutoff?

'''TO DO: the main function, where the magic happens aka spits out the recommended movies
parameter: you, or person1
'''

def colab_filt(p1):
    ##TO DO: we should ignore: invalid scores and movies p1 hasn't seen
    ##calculate the similarity scores to everyone in the database
    ##get the movies of those most similar to p1's preferences
    ##display them (will most likely store the movies in a list/array/whatever, front end should take care
    ##of displaying posters and whatnot

''' drawback: above may be too slow, may have to see what happens during actual implementaion. another possibility:'''

###############

'''an approach that does not require too many loops (the above might use a lot of for/while loops hence the slowness) and utilizes
both user-based AND item-based filtering
1) user-based --> similarities between user history
2) item-based --> similarities between movie history

Rather than calculating distance, I would use cosine similarities (from python library scipy)
1) I'd first apply item-based filtering
1a) i.e. -> match Toy Story similar films such as Toy Story 2, Bug's Life, Up, etc. (animation films)
2) THEN I would apply user-based filtering

^^^ above is a work in progress, I will need to do more research




    

