var inquirer = require("inquirer");
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "GarnetandGold1992",
    database: "bamazon"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM products", function(err, res, fields) {
        if (err) throw err;
        console.log(res);
    });
    start();
});

function start() {
    inquirer.prompt({
        name: "itemID",
        type: "input",
        message: "Please enter the item ID number"
    })
    .then(function(answer) {
        con.query("SELECT * FROM products WHERE ?", 
        {
            item_id: answer.itemID
        },
        function(err, res) {
            if (err) throw err;
            console.log(res);
            start();
        });
        if(answer.itemID === true) {
            console.log(con.query(res))
        }
        else {
            console.log("Sorry, we don't carry that item");
        }
    })
};

