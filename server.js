// Dependencies

const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const { start } = require("repl");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"password",
    database: "employee_trackerDB",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    start();
});