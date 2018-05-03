const express = require('express');

const app = express();

app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.send('Welcome to Who What Where!');
});

app.listen(3600, () => {
    console.log('Running server at localhost:3600');
});