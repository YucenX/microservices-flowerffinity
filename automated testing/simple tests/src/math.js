
// finds the gcd of two ints using euclid algo
function gcd(a, b) {
    // Ensure the numbers are positive
    a = Math.abs(a);
    b = Math.abs(b);

    // Use the Euclidean algorithm
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

// ** mocking tutorial **
// we use dependancy injection to give this function the necessary helpers needed to complete its tasks.
// however, we can just pass a "fake" helper function during testing to truly test this function 
// instead of the helper one. plus we avoid some of the pitfalls of using the real helper function, like long wait times for DB queries
function findPokemonWithMatchingTypes(type1, type2, databaseHelperFunction) {
    // perform some complicated database operation
    return databaseHelperFunction(type1, type2);
}

const vaporeon = {
    "type": "Water",
    "id" : 134,
    "name" : "Vaporeon"
}

// add more functions to test here

module.exports = {
    gcd, //exports functions to use in other modules
    findPokemonWithMatchingTypes,
    vaporeon,
    // remember to export other functions if you want to test them 
};
