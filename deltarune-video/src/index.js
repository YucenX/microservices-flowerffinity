const fs = require("fs");
const express = require("express") 

const app = express();

//
// Throws an error if the PORT environment variable is missing.
//
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;


// http get handler from chapter 3, where we baked the video into the image.
// for some reason the chapter 3 version of our microservice is used extensively
// as a base for building off future chapters, so you probably should not delete this code
app.get("/oldvid", async (req, res) => {

    console.log("Received a GET request to play funny deltarune animation.")

    const vidPath = "./videos/berdly_balls_on_kris.mp4";
    const stats = await fs.promises.stat(vidPath);

    res.writeHead(200, {
        "content-length": stats.size,
        "content-type": "video/mp4", 
    });
    fs.createReadStream(vidPath).pipe(res);
});


//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice online.`);
});
