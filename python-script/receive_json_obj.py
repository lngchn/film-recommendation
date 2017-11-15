#11-15-17, 2:02 am
import sys, json

#Read in data from Node.js
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def init():
    user_obj = read_in()  
    #user_id = user_obj["user_id"]
    output_str =''
    
    #Concatenate each film id with a space in between 
    for i in range(0, len(user_obj["films"])):
      x = user_obj["films"][i]
      output_str +=x["imdb_id"] + " "

    #Exit the loop and print out a single concatenated string of film IDs
    print(output_str)

def main():
    init()
   
if __name__ == '__main__':
    main()
