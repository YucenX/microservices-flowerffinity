// test automation with Jest
// to turn on live reload, use the following command:
// npx jest --watchAll

// to turn on live reload based on Git, use this command:
// npx jest --watch

// the second command has better performance since it only runs tests for a specific file
// when that file is changed, rather than blindly running all tests 


// import functions that we are testing
const { gcd } = require("./math");
const { findPokemonWithMatchingTypes } = require("./math");
const { vaporeon } = require("./math");

// creates a test suite named "gcd function"
describe("gcd function", () => {

    // creates a test named "gcd of 48 and 18"
    test("gcd of 48 and 18", () => {
        const result = gcd(48, 18); // use our function and store the result
        expect(result).toBe(6); // compare result with expected value of 6
    }); // if the assertion fails, then the test fails.

    test("gcd of 56 and 98", () => {
        const result = gcd(56, 98);
        expect(result).toBe(14);
    });

    // add more tests to this suite here....

});

describe("pokemon mocking function", () => {

    test("vaporeon mock", () => {
        // create a mock DB helper function
        const mockDBHelper = (type1, type2) => {
            // check that the pokemon function is passing the correct details to the DB helper
            expect(type1).toBe("Water");
            expect(type2).toBe("Water");
            return vaporeon; // hardcodes the mock function to return a vaporeon
        }

        // calls our pokemon function with our mock helper
        const result = findPokemonWithMatchingTypes("Water", "Water", mockDBHelper);
        
        // checks that our hardcoded value is returned
        expect(result).toBe(vaporeon);
    });

    test("gardevoir mock", () => {
        
        const PokeTypes = Object.freeze({ // create enums for pokemon types
            PSYCHIC : Symbol("psychic"),
            FAIRY : Symbol("fairy")
        });

        // here's a different mock function with different input and output types
        const mockDBHelper = (type1, type2) => {
            
            expect(type1).toBe(PokeTypes.PSYCHIC);
            expect(type2).toBe(PokeTypes.FAIRY);
            return 282; // returns gardevoir's natdex number
        }

        // calls our pokemon function with our mock helper
        const result = findPokemonWithMatchingTypes(PokeTypes.PSYCHIC, PokeTypes.FAIRY, mockDBHelper);
        
        // checks that our hardcoded value is returned
        expect(result).toBe(282);
    });

});

// add more test suites here...
