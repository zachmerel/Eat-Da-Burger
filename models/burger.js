//code heavily based on catsApp activity
// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
    all: (cb) => {
      orm.all("burger", (res) =>{
        cb(res);
      });
    },
    // The variables cols and vals are arrays.
    create: (cols, vals, cb) =>{
      orm.create("burger", cols, vals, (res) =>{
        cb(res);
      });
    },
    update: (objColVals, condition, cb) => {
      orm.update("burger", objColVals, condition, (res) => {
        cb(res);
      });
    },
    delete: (condition, cb) => {
      orm.delete("burger", condition, (res) => {
        cb(res);
      });
    }
  };

// Export the database functions for the controller (burgerController.js).
module.exports = burger;

