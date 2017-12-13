# Film Recommendation

Live demo: https://filmpro.herokuapp.com

## Project Setup

### Deveopment Build:

1) Clone repository
2) cd to root directory and install Express.js install Express.js dependencies
```
npm install
```
3) cd to /client to install React.js dependencies
```
npm install
```
4) Create environment variables for TMDB API key and MongoDB URL and their respective values: `KEY: TMDB_KEY` and `KEY: MongoDB_URL`
5) To start Express server, under root directory
```
npm start
```
6) To start React server, under /client directory
```
npm start
```

### Production Build:

cd to /client; this step creates a build folder in /client that will be read by Express.js
```
npm run build
```

## Heroku Deployment

1) cd to project root directory
```
heroku login
heroku create filmpro
```
2) Using your web browser and go to Heroku dashboard > filmpro > Settings, under Config Variables section, set up two environment variables with their respective values: `KEY: TMDB_KEY` and `KEY: MongoDB_URL`

3) Using your web browser and go to Heroku dashboard > filmpro > Settings, under Buildpacks section, add Python buildpack.

4) Push the project to Heroku master branch
```
git push heroku master
```
5) To ensure that at least one instance of the application is running
```
heroku ps:scale web=1
```
### Heroku Deployment Optional
6) If you don't have your own mLab setup, you can set it up on Heroku (you need credit card)
```
heroku addons:create mongolab
```
7) To see Heroku environment variable where it contains the MongoDB URI (you must also edit the code to use this environemnt variable in your program)
```
heroku config:get MONGODB_URI
```
8) Create a 'Procfile' (no file extension) file if not already existed in your project root directory. This file tells Heroku how to start the app. Add this line to the file
```
web: node server.js
```
9) Create a 'requirements.txt' file if not already existed in your project root directory. This file tells Heroku what Python libraries to install. Add this line to the file
```
requests==2.18.4
```
10) Additionally, you may create a 'runtime.txt' file to tell Heroku what Python version you want to use. For example, adding this line to the runtime.txt tells Heroku to use Python version 3.6.3
```
python-3.6.3
```

### NOTE
- Make sure you push the production /client/build folder to Heroku master branch for the app to work.
- If you have an existing app on Heroku and you are getting 'no app specified' message on the command line, you can correct it by running this on your local terminal: `heroku git:remote -a MyHerokuAppName`
- To SSH into Heroku app: `heroku run bash`
