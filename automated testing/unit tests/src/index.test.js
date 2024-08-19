//
// An example of running unit tests against the "metadata" microservice using Jest.
//

describe("metadata microservice", () => {

    //
    // Setup mocks.
    //

    // jest.fn will create functions that can detect when they are called, and if so, with what arguments
    const mockListenFn = jest.fn();
    const mockGetFn = jest.fn();

    // jest.doMock can mock entire modules 
    jest.doMock("express", () => { // Mock the Express module.
        return () => { // The Express module is a factory function that creates an Express app object.
            return { // Mock Express app object. 
                
                // In the real code, we invoke app.listen to start the service and app.get to handel GET requests
                listen: mockListenFn,
                get: mockGetFn,
            };
        };
    });

    /* We will now try to mock the MongoDB module, which is is a pretty complicated object.

    const mongoimport = {
        MongoClient: {  // nested object
            connect: () => {  // function inside object that returns another object
                return {
                    db: () => { // function inside returned object, which itself returns another object
                        return {
                            collection: () => { // db object returns an object containing another function
                                return {};  // collection function currently returns an empty object
                                            // but later we will be adding another function to this object
                            }
                        };
                    }
                };
            }
        }
    }

    you can see how all of these nested objects and functions are used in the first few lines of code of startMicroservice(...) :

    const client = await mongodb.MongoClient.connect(dbhost); // Connects to the database.
    const db = client.db(dbname);
    const videosCollection = db.collection("videos");
    */

    const mockVideosCollection = { // Mock Mongodb collection. 
    };

    const mockDb = { // Mock Mongodb database.
        collection: () => {
            return mockVideosCollection;
        }
    };

    const mockMongoClient = { // Mock Mongodb client object.
        db: () => {
            return mockDb;
        }
    };
    
    jest.doMock("mongodb", () => { // Mock the Mongodb module.
        return { // Mock Mongodb module.
            MongoClient: { // Mock MongoClient.
                connect: async () => { // Mock connect function.
                    return mockMongoClient;
                }
            }
        };
    });

    //
    // Import the module we are testing.
    //

    const { startMicroservice } = require("./index"); 

    test("microservice starts web server on startup", async () => {
        
        await startMicroservice("dbhost", "dbname", 3000);

        expect(mockListenFn.mock.calls.length).toEqual(1);     // Check only 1 call to 'listen'.
        expect(mockListenFn.mock.calls[0][0]).toEqual(3000);   // Check for port 3000.

        // im assuming that jest.fn.mock.calls is a 2d list. 
        // the outer list contains a bunch of lists of arguments, corresponding to each time the function was called
    });

    test("/videos route is handled", async () => {
        
        await startMicroservice("dbhost", "dbname", 3000);

        expect(mockGetFn).toHaveBeenCalled();

        const videosRoute = mockGetFn.mock.calls[0][0];
        expect(videosRoute).toEqual("/videos");
    });

    test("/videos route retreives data via videos collection", async () => {

        await startMicroservice("dbhost", "dbname", 3000); // starts microservice

        // create a mock request/response object pair
        const mockRequest = {};
        const mockJsonFn = jest.fn();
        const mockResponse = {
            json: mockJsonFn
        };
        // in the real code, we call res.json(...) , so we also make a mock function for that

        const mockRecord1 = {};
        const mockRecord2 = {};

        // Mock the find function to return some mock records.
        // in the real code, we call  const videos = await videosCollection.find().toArray(); 
        mockVideosCollection.find = () => {
            return {
                toArray: async () => { // This is set up to follow the convention of the Mongodb library.
                    return [ mockRecord1, mockRecord2 ];
                }
            };
        };

        const videosRouteHandler = mockGetFn.mock.calls[0][1]; // Extract the /videos route handler function.
        // aka videosRouteHandler now points to the lambda function defined by (req, res) => {...} in the app.get handler

        await videosRouteHandler(mockRequest, mockResponse); // Invoke the request handler.

        expect(mockJsonFn.mock.calls.length).toEqual(1); // Expect that the json fn was called.
        expect(mockJsonFn.mock.calls[0][0]).toEqual({
            videos: [ mockRecord1, mockRecord2 ], // Expect that the mock records were retrieved via the mock database function.
        });
    });

    // ... more tests go here ...

});
