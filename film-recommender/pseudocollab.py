'''TO DO: create an efficient collaborative filtering algorithm
1) database: 5,000+ users and 10,000 + films from IMDB/TMDB
2) schema of database: random IMDB users, ratings of films
3) distance formulas: euclidean, manhattan, hamming, jaccard, pearson's (will use this)
3a) manhattan --> too basic
3b) euclidean --> better than manhattan but still too basic
note: for the above two distances, easy to implement but it's hard to scale hence too basic
3c) hamming --> not relevant although interesting
3d) jaccard --> great but too complicated, seems most precise
3e) pearson's --> great, will use this

Pearson's
"best fit" line and solves inflation problem (i.e. 10 and 4 vs. 8 and 2 will not be too far apart)
'''

##warning: this may not scale, will have to do something before to filter out
##suggestion: perhaps only compare users who match with user's first "seed" film 
def pearson(p1, p2):
    ##TO DO: check to see if person1 and person2 have common films
    ##no common films = break, otherwise calculate the pearson's correlation between the two people
    ##WARNING: may not scale, may need to find another way to do this
    ###############
    
    common_films = {} ##dictionary, key: movie itself, value: either 1 or 0
    
    ##here, implement a for loop to search for common preferences within the database
    for movie in USER_USING_OUR_WEBSITE_MOVIE_PREFERENCES:
        if movie in ROW_OF_DATABASE:
            common_films[movie] = 1 ##it exists, set its value to 1
        else:
            return 0 ##terminate, we found a film that isn't shared
        
    ##begin the pearson (we have to: a) add up the preferences, b) sum up the squares, c) sum
    ##up the products and lastly, d) do pearson's correlation from a, b, and c
    
    ##add up the preferences
    p1_sum = sum(USER_USING_OUR_WEBSITE_MOVIE_PREFERENCES[movie] for movie in common_films)
    p2_sum = sum(ROW_OF_DATABASE_THAT_MATCHES_USER[movie] for movie in common_films)
    
    ##sum up the squares
    p1_sum_sq = sum((pow(USER_USING_OUR_WEBSITE_MOVIE_PREFERENCES[movie], 2) for movie in common_films))
    p2_sum_sq = sum((pow(ROW_OF_DATABASE_THAT_MATCHES_USER[movie], 2) for movie in common_films))
    
    ##sum up products
    product_sum = sum(USER_USING_OUR_WEBSITE_MOVIE_PREFERENCES[movie] * ROW_OF_DATABASE_THAT_MATCHES_USER[movie] for movie in common_films)
    
    ##get the pearson correlation
    top = product_sum - ((p1_sum * p2_sum) / len(common_films))
    bottom = sqrt((p1_sum_sq - pow(p1_sum, 2) / len(common_films)) * (p2_sum_sq - pow(p2_sum, 2) / len(common_films)))
    
    return top / bottom
    
def s_users(p1, database_ppl):
    ##TO DO: essentially, get all of the top scores (add a cutoff)
    ##store in dictionary/list? have the most similar "on top"

def colab_filt(p1):
    ##TO DO: ignore invalid scores, movies person1 hasn't seen
    ##calculate similarity scores to everyone in database (might be too slow)
    ##get the movies most similar to p1's preferences
    ##display 


    

