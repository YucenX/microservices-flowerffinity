const express = require('express');
const fs = require('fs');

const app = express();

const port = 3000;

// for get requests to localhost:3000/  , send a response of "Hello, World!"
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

// get requests to localhost:3000/video
app.get("/video", async (req, res) => {
    const vidPath = "./videos/intro 2021 - near end.mp4"; 
    const stats = await fs.promises.stat(vidPath);

    // write the response head, which includes video format and size
    res.writeHead(200, {
        "content-length": stats.size,
        "content-type": "video/mp4"
    });

    // open a stream to read the vid, and pipe the read data to our response
    fs.createReadStream(vidPath).pipe(res);
})

// start server?
app.listen(port);

