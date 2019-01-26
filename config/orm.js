//code heavily based on catsApp activity
// Import MySQL connection.
const connection = require("../config/connection.js");

// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
printQuestionMarks = (num) => {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
objToSql = (ob) => {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Bacon Jr. Cheeseburger => 'Bacon Jr. Cheeseburger')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `"${value}"`;
            }
            // e.g. {burger: 'Bacon Jr. Cheeseburger '} => ["burger='Bacon Jr. Cheeseburger '"]
            // e.g. {devoured: true} => ["devoured=true"]
            arr.push(`${key}=${value}`);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    all: (tableInput, cb) => {
        let queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: (table, val, cb) => {
        
        let queryString = `INSERT INTO ${table} (burger_name) VALUES('${val}')`;
        console.log("hits this in orm")
        connection.query(queryString,  (err, result) => {
            console.log("querystring",queryString)
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // An example of objColVals would be {burger: Double Stack, devoured: true}
    update:  (id,table, cb) => {
        connection.query(`UPDATE ${table} SET devoured=1 WHERE id= ${id}`,function(err,res){
            if(err) throw err;
            cb(res);
        } )
    },
    delete:  (table, condition, cb) => {
        let queryString = `DELETE FROM ${table} WHERE ${condition}`
 
        connection.query(queryString,  (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

// Export the orm object for the model (burger.js).
module.exports = orm;