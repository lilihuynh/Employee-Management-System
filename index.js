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

function addNewDepartment() {
    inquirer
        .prompt({
            name: "newDepartment",
            type: "input",
            message: "What the name of the department you would like to add?",
        }).then(function (answer) {
            var query = "INSERT INTO department SET ?"
            connection.query(query, { name: answer.newDepartment }, function (err, res) {
                if (err) throw err;
                console.log("Department " + answer.newDepartment + "was successfully added!");


                start();
            });
        })
}

function addNewRoles() {
    var query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        var arr = new Array; //same as var arr= [];
        var data = JSON.parse(JSON.stringify(res));
        for (var key in data) {
            arr.push(data[key].id + ") " + data[key].name);
        }

        var departmentNames = arr;
        inquirer
            .prompt([
                {
                    name: "newTitle",
                    type: "input",
                    message: "What is the title would you like to add?",
                },

                {
                    name: "departmentChoice",
                    type: "list",
                    message: "Which department would you like to add this role to?",
                    choices: departmentNames
                },

                {
                    name: "newSalary",
                    type: "input",
                    message: "What is the salary for this role?",
                },


            ]).then(function (answer) {
                var query = "INSERT INTO roles SET ?"
                connection.query(query, { title: answer.newTitle, salary: answer.newSalary, department_id: answer.departmentChoice.charAt(0) }, function (err, res) {
                    if (err) throw err;
                    console.log("New role of " + answer.newTitle + "was successfully added to department " + answer.departmentChoice + "with salary " + answer.newSalary);

                    start();
                });
            })

    });
}

function addNewEmployee() {
    var query = "SELECT * FROM roles"
    connection.query(query, function (err, res) {
        if (err) throw err;
        var rolesList = res.title;
        console.log(rolesList);
        inquirer
            .prompt([

                {
                    name: "firstName",
                    type: "input",
                    message: "What is the employee's first name?",
                },

                {
                    name: "lastName",
                    type: "input",
                    message: "What is the employee's last name?",
                },

                {
                    name: "newRole",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: rolesList
                },

                {
                    name: "managerName",
                    type: "input",
                    message: "Who is the employee's manager?",
                },

            ]).then(function (answer) {
                var query = "INSERT INTO employees SET ?"
                connection.query(query,
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.id //

                    },
                    function (err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            console.log(
                                "id: " + res[i].id +
                                " ||  Department Name: " + res[i].name
                            );
                        }
                        start();
                    });
            })
    })
}

function viewDeparments() {
    var query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                "id: " + res[i].id +
                " ||  Department Name: " + res[i].name
            );
        }
        start();
    });
}

function viewRoles() {
    var query = "SELECT * FROM roles"
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                "id: " + res[i].id +
                " ||  Tittle: " + res[i].title +
                " ||  Salary: " + res[i].salary +
                " ||  Department_id: " + res[i].department_id
            );
        }
        start();
    });
}

function viewEmployees() {
    var query = "SELECT * FROM employee"
    connection.query(query, function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(
          "id: " + res[i].id +
          " ||  First name: " + res[i].first_name +
          " ||  Last name: " + res[i].last_name +
          " ||  Role id: " + res[i].role_id +
          " ||  Manager id: " + res[i].manager_id
        );
      }
      start();
    });
  }