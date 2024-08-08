const request = require("supertest");
const { app } = require("../index");  // import our express app from index.js (in parent folder)

// my guess is that this code names the test suite?
describe("video streaming microservice", () => {

    // name of test?
    test("microservice can handle requests", async () => {

        // the book uses a separate route to check for status 200, wonder if that makes a difference
        const response = await request(app).get("/oldvid"); // Makes a request to the "/oldvid" route.
        expect(response.status).toBe(200); // Verify that a HTTP status code 200 is returned, indicating success.
    });
});
