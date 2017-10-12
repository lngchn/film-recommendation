Film Recommender

## Instructions

Deveopment Build:
```bash
1. clone project
2. cd to root directory: npm install (install Express dependencies)
3. to start Express server: npm start (under root directory)
4. cd to client: npm install (install React dependencies)
5. to start React server: npm start (under client directory)
```

Production Build:
```bash
1. cd to client
2. npm run build
3. a folder called 'build' will be created
4. production build will be hosted on the Express server
```

MongoDB:
```bash
1. Install MongoDB Community Edition: https://docs.mongodb.com/manual/administration/install-community
2. Create the data directory (absolute path on the drive from which you start MongoDB): /data/db
3. Start the server by running: mongod
```

You can use the mongo Shell or Mongo Compass to check the database.
Start the mongo Shell at bin/mongo

Useful mongo Shell commands:

```bash
1. show dbs - show all the databases
2. db - show current database
3. use filmpro - switch to a database called filmpro
4. show collections - show all the collections in the current database
5. db.users.find() - show all the data in the users collection
6. db.users.drop() - drop the collection called users (WARNING, it will delete the collection and all the data in it)
```
