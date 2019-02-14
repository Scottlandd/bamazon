// Create variables to store the required node modules.
var inquirer = require("inquirer");
var mysql = require("mysql");
// This step stores the JSON data in a variable to connect the app to the local mySQL server.
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "GarnetandGold1992",
    database: "bamazon"
});
// This step tells the computer to run the app if the connection to the mySQL server is successful.
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    start();
});
// This function is the start of the app, which first displays the JSON data from the table "products" stored in the mySQL "bamazon" database.
function start() {
    // This step prompts the user to enter the id number for the item they wish to purchase.
    inquirer.prompt({
        name: "itemID",
        type: "input",
        message: "Please enter the desired item ID number"
    })
    // This promise tells the app to select the product number entered by the user and to find it in the "products" table.
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
        // I intended for this step to log the JSON data for the entered itemID to the console
        // and to log "Sorry, we don't carry that item" if the entered itemID does not exist within the table.
        if(answer.itemID === false) {
            console.log("Sorry, we don't carry that item");
            start();
        }
        else {
            console.log(con.query(res.itemID));
        }
    });
};
// Still needed: * Inquire user for number of items desired for purchase.
// * Create a function to check inventory numbers.
//      - If inventory numbers are sufficient to provide the user with their purchase, subtract the purchased items from inventory and display the total cost to the user.
//      - If inventory numbers are insuffiecient, alert to the user that there is not enough product in stock to complete the transaction.
// * Provide screenshots/GIFs to show that the app is functional.

