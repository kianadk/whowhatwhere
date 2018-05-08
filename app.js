const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('./yelp.js');
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const User = require('./user');

const connection = mongoose.connect('mongodb://localhost/whowhatwhere');

let userCount = 0

const certOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
};

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // res.send('Welcome to Who What Where!');
  res.render('index.html');
});

app.post('/yelp', async function(req, res) {
  try {
    const info = await yelp(req.body.latitude, req.body.longitude);
    res.json(info);
  }
  catch(e) {
    res.send("Error finding businesses with Yelp");
    console.log(e);
  }
});

app.route('/user')
  .get((req, res) => {
    User.find((err, users) => {
      if (err) {
        res.send(err);
      }

      res.json(users);
    })
  })
  .post((req, res) => {
    let user = new User();
    user.name = 'user' + (userCount++);
    user.latitude = req.body.latitude;
    user.longitude = req.body.longitude;

    user.save((err) => {
      if (err) {
        res.send(err);
      }

      console.log('added user to db');
      res.json({message: "addition successful"});
    });
  });

https.createServer(certOptions, app).listen(3600, () => {
  console.log('Running server at localhost:3600');
});
