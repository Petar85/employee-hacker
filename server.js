// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_DB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id" + connection.threadId);
});

const askQ = function () {
    inquirer
        .prompt({
            type: "list",
            name: "startQ",
            message: "What would you like to do?",
            choices: [
                "view all employees",
                "view all roles",
                "view all departments",
                "add employee",
                "add department",
                "add role",
            ]
        })
        .then(function (answer) {
            console.log(answer);

            // start of switch statment for user choice
            switch (answer.startQ) {
                case "view all employees":
                    viewallemployees();
                    break;

                case "view all roles":
                    viewallroles();
                    break;

                case "view all departments":
                    viewalldepartments();
                    break;

                case "add employee":
                    addEmployee();
                    break;

                case "add department":
                    addDepartment();
                    break;

                case "add role":
                    addRole();
                    break;

                
            }
        });
};

askQ();

// allows user to view all departments currently in the database
function viewalldepartments() {
    connection.query("SELECT * FROM department", function (err, answer) {
        console.log("\n Departments Retrieved from Database \n");
        console.table(answer);
    });
    askQ();
}

// allows user to view all employee roles currently in the database
function viewallroles() {
    connection.query("SELECT * FROM role", function (err, answer) {
        console.log("\n Roles Retrieved from Database \n");
        console.table(answer);
    });
    askQ();
}

// allows user to view all employees currently in the database
function viewallemployees() {
    console.log("retrieving employess from database");
    var fancyQuery =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
    connection.query(fancyQuery, function (err, answer) {
        console.log("\n Employees retrieved from Database \n");
        console.table(answer);
    });
    askQ();
}

// allows user to add a new department into the database
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "enter department name",
            name: "dept"
        })
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.dept
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                }
            ),
                console.table(answer);
            askQ();
        });
}

// allows user to add a new role/title
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "enter employee title",
                name: "addtitle"
            },
            {
                type: "input",
                message: "enter employee salary",
                name: "addsalary"
            },
            {
                type: "input",
                message: "enter employee department id",
                name: "addDepId"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.addtitle,
                    salary: answer.addsalary,
                    department_id: answer.addDepId
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.table(answer);
                }
            );
            askQ();
        });

}

// allows user to add a new employee to database
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee first name",
                name: "firstname"
            },
            {
                type: "input",
                message: "Enter employee last name",
                name: "lastname"
            },
            {
                type: "input",
                message: "Enter employee role id",
                name: "roleId"
            },
            {
                type: "input",
                message: "Enter employee manager's id",
                name: "managerId"
            },

        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: answer.roleId,
                    manager_id: answer.managerId
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.table(answer);
                }
            );
            askQ();
        });
}









