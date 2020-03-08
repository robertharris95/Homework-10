//RUN SCHEMA PRIOR TO RUNNING PROGRAM

//REQUIREMENTS
var inquirer = require('inquirer');
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Rh12271995",
  database: "workers_CMS"
});

//CONNECTION TO BE RUN INSIDE
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  app();
});



//APPLICATION
function app(){
//Initial Question
inquirer.prompt(
    {
        type:'list',
        name:'command',
        message:'What would you like to do?',
        choices: ['Add information', 'Update Information', 'Read Current Information']
    }
).then(function(response){
    //ADDING INFO FUNCTIONS
    if(response.command === 'Add information'){
        //Specify table to add to 
        inquirer.prompt(
            {
                type:'list',
                name:'want',
                message:'Which table would you like to add to?',
                choices: ['Departments', 'Roles', 'Employees']
            }
        ).then(function(specific){

        //ADD DEPARTMENTS
        if(specific.want === 'Departments'){
            addDept();
        };

        //ADD ROLES
        if(specific.want === 'Roles'){
            addRole();
        };

        //ADD EMPLOYEES
        if(specific.want === 'Employees'){
            addEmployee();
        };
    });
    };
//READING INFO

    if(response.command === 'Read Current Information'){
        inquirer.prompt(
            {
                type:'list',
                message:'Which table data would you like to view?',
                name:'table',
                choices:['Departments', 'Roles', 'Employees']
            }
        ).then(function(decision){

        //VIEW DEPARTMENTS
        if(decision.table === 'Departments'){
        readDepartments();
        };
        //VIEW ROLES
        if(decision.table === 'Roles'){
        readRoles();
        };
        //VIEW EMPLOYEES
        if(decision.table === 'Employees'){
        readEmployees();
        };
    });
    };
//UPDATING DATA
    if(response.command === 'Update Information'){
        //UPDATE EMPLOYEE ROLES
        updateEmployee();
        }
    });



//Functions------------------------------------------------------------------------


//ADD INFO

//ADD DEPT
function addDept() {
    inquirer.prompt(
        {
            message:'What is the name of the new Department?',
            name:'newDept',
        }
    ).then(function(newdata){
        var query = connection.query(
        "INSERT INTO department SET ?",
        {
            deptname: newdata.newDept
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Roles created!\n");
            
        }
    );
        readDepartments();
    })
};

//ADD ROLE
function addRole() {
    inquirer.prompt([
        {
            message:'What is the name of the new Role?',
            name:'newrole',
        },
        {
            message:'What is the new Salary?',
            name:'newpay',
        },
        {
            message:'What is the new department id',
            name:'newdeptid',
        }
    ]).then(function(newdata){
    var query = connection.query(
    "INSERT INTO emprole SET ?",
    {
        title: newdata.newrole,
        salary: newdata.newpay,
        dept_id: newdata.newdeptid
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Roles created!\n");
        
    }
    );
    readRoles();
});
};

//ADD EMPLOYEE
function addEmployee() {
    inquirer.prompt([
        {
            message:'What is the new employee first name?',
            name:'first',
        },
        {
            message:'What is the new employee last name?',
            name:'last',
        },
        {
            message:'What is the new employee role id',
            name:'roleid',
        },
        {
            message:'What is the new employee managers id?',
            name:'manager',
        }
    ]).then(function(newdata){
    var query = connection.query(
    "INSERT INTO employee SET ?",
    {
        first_name: newdata.first,
        last_name: newdata.last,
        role_id: newdata.roleid,
        manager_id: newdata.manager,
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Roles created!\n");
    }
    );
    readEmployees();
});
};

//-------------------------------------------------------------------------------

//VIEW DEPARTMENTS
function readDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
    restart();    
    });
}
//VIEW ROLES
function readRoles() {
    connection.query("SELECT * FROM emprole", function(err, res) {
    if (err) throw err;
    console.table(res);
    restart();
    });
}
//VIEW EMPLOYEES
function readEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    restart();
    });
}

//---------------------------------------------------------------------------------

//UPDATE EMPLOYEE
function updateEmployee() {
    inquirer.prompt([
        {
            type:"list",
            message:"Who's role would you like to update?",
            name:"person",
            choices:[]
        },
        {
            type:"list",
            message:"What is their new role?",
            name:"newrole",
            choices:[]
        }
]).then(function(newdata){ 
        var query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
        {
            role_id: newdata.newrole
        },
        {
            id: newdata.person
        }
        ],
        function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee updated!\n");
        }
    );
});
readEmployees()
restart();
}

//RESTART
function restart(){
    inquirer.prompt(
        {
            type:'confirm',
            message:'Would you like to make another request?',
            name:'confirm'

        }
    ).then(function(restarter){
        if (restarter.confirm === true){
            app();
        }
        else{
            console.log("Thank you!")
            console.log("Exiting Program...")
            connection.end()
            return;
        }
    })
}
};