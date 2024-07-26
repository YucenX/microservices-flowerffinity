const express = require('express');
const fs = require('fs');

// throw an error if the PORT environment variable DNE 
if (!process.env.PORT) {
    throw new Error("No environment variable named PORT. Please specify one so that we know the port number for the HTTP server.")
}

// get the port number for PORT

const port = process.env.PORT;

const app = express();

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

// start server with `npm start` (production mode) or `npm run start:dev` (developer mode)
app.listen(port, () => {
    console.log(`Microservice has begun listening on port ${port}, please point your browser to http://localhost:${port}/video`);
});

// for product deployment, run `npm install --omit=dev` to omit the installing of developer-only dependancies such as nodemon.
