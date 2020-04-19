const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// Inquirer questions
const newEmployeeQuestions = [
    {
        type: 'input',
        name: 'employeeName',
        message: 'What is your full name?',
        validate: function(text) {
            if (text.length < 1) {
              return 'Please enter a your full name';
            }
            return true;
          },
          filter: String
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your employee id?',
        validate: function(value) {
            const valid = (Number.isInteger(value) && (value !== 0))
            return valid || 'Please press the up arrow button and enter a valid number'
          },
        filter: Number
    },
    {
        type: 'input',
        name: 'email',
        message: "What's your work email?",
        validate: function(value) {
        const regex = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\.]{2,5}$/i
        return regex.test(value) || 'Please enter a valid email address'
        },
        filter: String
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is your role?',
        choices: ['engineer', 'manager', 'intern']
    }
]

// Questionaire function using inquirer
const roleQuestionaire = async () => {
    try {
        return response = await inquirer.prompt(newEmployeeQuestions)
    } catch (err) {
        console.log(err)
    }
}
const getResult = async () => {
    const response = await roleQuestionaire()
    return response
}



// Extra Information
let engineerDetail = [
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        validate: function(text) {
            if (text.length < 1) {
              return 'Please enter a valid GitHub username';
            }
            return true;
          },
          filter: String
    }
]
let internDetail = [
    {
        type: 'input',
        name: 'school',
        message: 'What is the name of your current school?',
        validate: function(text) {
            if (text.length < 1) {
              return 'Please enter your current school name';
            }
            return true;
          },
          filter: String
    }
]
let managerDetail = [
    {
        type: 'number',
        name: 'officeNumber',
        message: 'What is your office number?',
        validate: function (value) {
            var valid = !isNaN(parseInt(value));
            return valid || 'Please enter a valid office number';
        },
        filter: Number
    }
]


// Role Detail Questionaire function
const roleDetail = async () => {
    const {employeeName, id, email, role} = await getResult()

    try {
        if (role === 'engineer') {
            const response = await inquirer.prompt(engineerDetail)
            const detail = response['github']
            console.log({employeeName, id, email, role, detail})
            // return
        } else if (role === 'intern'){
            const response = await inquirer.prompt(internDetail)
            const detail = response['school']
            console.log({employeeName, id, email, role, detail})
        } else if (role === 'manager'){
            const response = await inquirer.prompt(managerDetail)
            const detail = response['officeNumber']
            console.log({employeeName, id, email, role, detail})
        }
    } catch (err) {
        console.log(err)
    }
}

roleDetail()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
