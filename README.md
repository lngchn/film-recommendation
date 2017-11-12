# Film Recommender

## Instructions

Deveopment Build:

1. clone project
2. cd to root directory: npm install (install Express dependencies)
3. cd to client: npm install (install React dependencies)
4. create environment variable for TMDB API key: 
```bash
variable name: TMDB_KEY
variable value: Your TMDB API key
```
5. create environment variable for MongoDB url
```bash
variable name: MongoDB_URL
variable value: full path to MongoDB url, including username and password
```
6. to start Express server: npm start (under root directory)
7. to start React server: npm start (under client directory)

Production Build:
1. cd to client
2. npm run build
3. a folder called 'build' will be created
4. production build will be hosted on the Express server

## Heroku Deployment

1. cd to project root directory

2. 
```bash
heroku login
```

3.
```bash
heroku create filmpro
```

4. Go to Heroku dashboard > filmpro > Settings, under Config Variables section, set up two environment variables: <br/>
KEY: TMDB_KEY, VALUE: tmdb_api_key <br/>
KEY: MongoDB_URL, VALUE: mongodb_url

5.
```bash
git push heroku master
```

6.
```bash
heroku ps:scale web=1
```

OPTIONAL: If you don't have your own mLab setup, you can set it up on Heroku (you need credit card).<br/><br/>
7. Create a free mLab MongoDB database on Heroku
```bash
heroku addons:create mongolab
```
8. To see Heroku environment variable where it contains the MongoDB URI (you must also edit your code to use this environemnt variable in your program)
```bash
heroku config:get MONGODB_URI
```
9. Create a 'Procfile' (no file extension) file if not already existed in your project root directory. This tells Heroku how to start the app. Add this line to the file:
```bash
web: node server.js
```
<br/>
NOTE: Make sure you push the production /client/build folder to heroku master branch for the app to work.
<br/>
If you have an existing app on Heroku and you are getting 'no app specified' message on the command line, you can correct it by running this on your local terminal:
```bash
heroku git:reomte -a MyHerokuAppName
```
