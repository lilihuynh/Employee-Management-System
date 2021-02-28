var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "nC3NAy.C$uK^#!p",
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(" _____                _                         _____              _             ");
  console.log("|  ___|              | |                       |_   _|            | |            ");
  console.log("| |__ _ __ ___  _ __ | | ___  _   _  ___  ___    | |_ __ __ _  ___| | _____ _ __ ");
  console.log("|  __| '_ ` _ \| '_ \| |/ _ \| | | |/ _ \/ _ \   | | '__/ _` |/ __| |/ / _ \ '__|");
  console.log("| |__| | | | | | |_) | | (_) | |_| |  __/  __/   | | | | (_| | (__|   <  __/ |   ");
  console.log("\____/_| |_| |_| .__/|_|\___/ \__, |\___|\___|   \_/_|  \__,_|\___|_|\_\___|_|   ");
  console.log("               | |             __/ |                                             ");
  console.log("               |_|            |___/                                              ");
  start();
});