//code heavily based on catsApp activity
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../config/orm");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
    burger.all('burgers',(data) => {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", (req, res) => {
    const newBurger = req.body;
    burger.create('burgers',newBurger.burger_name,function(result){
        res.status(200).end();
    });
});

router.put("/api/burgers/:id", (req, res) => {
    let id = parseInt(req.params.id);

    burger.update(id,'burgers',function(result){
        if(res.RowsChanged === 0){
            res.status(404).end();
        }
        res.status(200).end();
    })
});

router.delete("/api/burgers/:id", (req, res) => {
    var condition = "id = " + req.params.id;

    burger.delete(condition, (result) => {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;