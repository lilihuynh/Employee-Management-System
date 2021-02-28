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

function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices:
          [
            "Add new department",
            "Add new roles",
            "Add new employees",
            "View departments",
            "View roles",
            "View all employees",
            "Update employee roles",
            "Exit"
          ]
      })
      .then(function (answer) {
       
        switch (answer.action) {
          case "Add new department":
            addNewDepartment();
            break;
          case "Add new roles":
            addNewRoles();
            break;
          case "Add new employees":
            addNewEmployee();
            break;
          case "View departments":
            viewDeparments();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Update employee roles":
            updateEmployeeRoles();
            break;
          case "exit":
            connection.end();
            break;
        }
  
      });
  
  
  }