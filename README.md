Who What Where is a class project for CS M117 at UCLA. It is a website where you can find out who (other users) and what (restaurants) is around you.

For help installing and running MongoDB, see `https://docs.mongodb.com/manual/installation/`

Instructions to run:
1) Make sure you have MongoDB, Node, and npm installed
2) Open up a MongoDB shell and create a new database with `use whowhatwhere`
3) Replace `MAP_KEY` on line 7 of index.html with your Bing API Map Key
4) Create a file called `passwords.json` in the main project directory that contains the following:

{
  "YELP_KEY": "your_yelp_api_key"
}


5) Run `npm install` to download dependencies
6) Use `node app.js` to run the server
7) Point your browser to `https://localhost:3600` to see the site
