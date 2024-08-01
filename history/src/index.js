const express = require("express");
const mongodb = require("mongodb");
const amqp = require('amqplib');

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the database host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME");
}

if (!process.env.RABBIT) {
    throw new Error("Please specify the name of the RabbitMQ host using environment variable RABBIT");
}

const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;
const RABBIT = process.env.RABBIT;

//
// Application entry point.
//
async function main() {

    const app = express();

    //
    // Enables JSON body parsing for HTTP requests.
    //
    app.use(express.json()); 

    //
    // Connects to the database server.
    //
    const client = await mongodb.MongoClient.connect(DBHOST);

    //
    // Gets the database for this microservice.
    //
    const db  = client.db(DBNAME);

	//
    // Gets the collection for storing video viewing history.
    //
    const historyCollection = db.collection("history");

    //
    // Connects to the RabbitMQ server.
    //
    const messagingConnection = await amqp.connect(RABBIT); 

    console.log("Connected to RabbitMQ.");

    //
    // Creates a RabbitMQ messaging channel.
    //
    const messageChannel = await messagingConnection.createChannel(); 
       
    // Asserts that we have a "viewed" exchange.
    // (i.e. check for the existance of a "viewed" exchange; if not, create one)
	await messageChannel.assertExchange("viewed", "fanout"); 
    // fanout - spreads the message out to the anonymous queues

	// Creates an anonyous queue. exclusive - queue will be deallocated when the microservices disconnects
	// the brackets around {queue} convert it into a string
	const { queue } = await messageChannel.assertQueue("", { exclusive: true }); 

    console.log(`INDIRECT: Created queue ${queue}, binding it to "viewed" exchange.`);
    
    // Binds the queue to the exchange.
    // anonymous queue means that the microservices "owns" this queue
    await messageChannel.bindQueue(queue, "viewed", ""); 
    
    //
    // Start receiving messages from the "viewed" queue.
    //
    await messageChannel.consume(queue, async (msg) => {
        console.log("INDIRECT: Received a 'viewed' message");

        const parsedMsg = JSON.parse(msg.content.toString()); // Parse the JSON message.
        
        await historyCollection.insertOne({ videoPath: parsedMsg.videoPath }); // Record the "view" in the database.

        console.log("INDIRECT: Acknowledging message was handled.");
                
        messageChannel.ack(msg); // If there is no error, acknowledge the message.
    });

    //
    // Handles HTTP POST request to /viewed.
    //
    app.post("/viewed", async (req, res) => { // Handle the "viewed" message via HTTP POST request.
        const videoPath = req.body.videoPath; // Read JSON body from HTTP request.
        await historyCollection.insertOne({ videoPath: videoPath }) // Record the "view" in the database.

        console.log(`DIRECT: Added video ${videoPath} to history database.`);
        res.sendStatus(200);
    });

    //
    // HTTP GET route to retrieve video viewing history.
    // http://localhost:4003/history?skip=0&limit=0
    app.get("/history", async (req, res) => {
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const history = await historyCollection.find()
            .skip(skip)
            .limit(limit)
            .toArray();
        res.json({ history });
    });

    //
    // Starts the HTTP server.
    //
    app.listen(PORT, () => {
        console.log("Microservice online.");
    });
}
 
main()
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });
