/*
Make sure each microservice has its own database (if required). Do not
share databases between microservices, as it leads to high coupling.

*/

const express = require("express");
const http = require("http");
const mongodb = require("mongodb");

// Throws an error if the any required environment variables are missing.
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.VIDEO_STORAGE_HOST) {
    throw new Error("Please specify the host name for the video storage microservice in variable VIDEO_STORAGE_HOST.");
}

if (!process.env.VIDEO_STORAGE_PORT) {
    throw new Error("Please specify the port number for the video storage microservice in variable VIDEO_STORAGE_PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the databse host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME");
}

// Extracts environment variables to globals for convenience.
const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);
const DBHOST = process.env.DBHOST;  // database server host?
const DBNAME = process.env.DBNAME;  // name of database microservice

console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

const app = express();

// Send the "viewed" to the history microservice.
function sendViewedMessage(videoPath) {
    const postOptions = { // Options to the HTTP POST request.
        method: "POST", // Sets the request method as POST.
        headers: {
            "Content-Type": "application/json", // Sets the content type for the request's body.
        },
    };

    const requestBody = { // Body of the HTTP POST request, JSON style
        videoPath: videoPath 
    };

    const req = http.request( // Send the "viewed" message to the history microservice.
        "http://history/viewed",
        postOptions
    );

    req.on("close", () => { // upon request close, inform console
        console.log("Sent 'viewed' message to history microservice.");
    });

    req.on("error", (err) => { // upon request error, inform console
        console.error("Failed to send 'viewed' message!");
        console.error(err && err.stack || err);
    });

    req.write(JSON.stringify(requestBody)); // Write the body to the request.
    req.end(); // End the request.
}


// put stuff in a main function like java, C, C++, ..
async function main() {
    const client = await mongodb.MongoClient.connect(DBHOST); // Connects to the database.
    const db = client.db(DBNAME);
    const videosCollection = db.collection("videos");
    
    const app = express();
        
    // http get handler
    app.get("/video", async (req, res) => {
        // get video id from http query, and search database for a video with the matching id
        const videoId = new mongodb.ObjectId(req.query.id);
        const videoRecord = await videosCollection.findOne({ _id: videoId });
        if (!videoRecord) {
            // The video was not found.
            res.sendStatus(404);
            return;
        }

        console.log(`Translated id ${videoId} to path ${videoRecord.videoPath}.`);

        const forwardRequest = http.request( // Forward the request to the video storage microservice.
            {
                host: VIDEO_STORAGE_HOST,
                port: VIDEO_STORAGE_PORT,
                path:`/video?path=${videoRecord.videoPath}`, // Video path now retrieved from the database.
                method: 'GET',
                headers: req.headers
            }, 
            forwardResponse => {
                res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
                forwardResponse.pipe(res);
            }
        );

        sendViewedMessage(videoRecord.videoPath);
        
        req.pipe(forwardRequest);
    });

    //
    // Starts the HTTP server.
    //
    app.listen(PORT, () => {
        console.log(`Microservice listening, please load the data file db-fixture/videos.json into your database before testing this microservice.`);
        console.log(`now's your chance to be a [[BIG SHOT]]!`);
    });
}

main()
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });
// this is some ugly javascript code

// for product deployment, run `npm install --omit=dev` to omit the installing of developer-only dependancies such as nodemon.

/*
To 


*/
