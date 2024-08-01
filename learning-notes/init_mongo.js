// this initialization script will create a video-streaming database
// and then add one entry into the database, corresponding to my video

db = db.getSiblingDB("video-streaming");

db.videos.insertOne({
    "_id": ObjectId("000000000000000000000000"),
    "videoPath" : "twilight_sparkle.mp4"
});

// db.videos.find().pretty();
