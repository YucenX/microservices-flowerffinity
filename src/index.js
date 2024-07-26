const express = require('express');

const app = express();

const port = 3000;

// for get requests to localhost:3000/  , send a response of "Hello, World!"
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

// start server?
app.listen(port);

