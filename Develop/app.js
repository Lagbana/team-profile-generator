'use strict'

// Import Dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs").promises;
const writeFileP = fs.writeFile

// Output file and folder
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "QA-team.html");

// Render final html 
const render = require("./lib/htmlRenderer");

// Inquirer questions
const newEmployeeQuestions = [
    {
        type: 'input',
        name: 'employeeName',
        message: "What is the employee's full name?",
        validate: function (text) {
            if (text.length < 1) {
                return "Please enter the employee's full name";
            }
            return true;
        },
        filter: String
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your employee's id?",
        validate: function (value) {
            const valid = (Number.isInteger(value) && (value !== 0))
            return valid || 'Please press the up arrow button and enter a valid number'
        },
        filter: Number
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your employee's work email?",
        validate: function (value) {
            const regex = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\.]{2,5}$/i
            return regex.test(value) || 'Please enter a valid email address'
        },
        filter: String
    },
    {
        type: 'list',
        name: 'role',
        message: "What is your employee's role in the company?",
        choices: ['manager', 'engineer', 'intern']
    }
]

// Questionaire function using inquirer
const employeeResponses = async () => {
    try {
        const response = await inquirer.prompt(newEmployeeQuestions)
        return response
    } catch (err) {
        console.log(err)
    }
}

// Role Specific Questionnaire
let engineerDetail = [
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's GitHub username?",
        validate: function (text) {
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
        message: "What school does the intern currently attend?",
        validate: function (text) {
            if (text.length < 1) {
                return 'Please enter a valid school name';
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
        message: "What is the manager's office number",
        validate: function (value) {
            var valid = !isNaN(parseInt(value));
            return valid || 'Please enter a valid office number';
        },
        filter: Number
    }
]

// Role Detail Questionnaire function
const roleDetail = async () => {
    const { employeeName, id, email, role } = await employeeResponses()
    try {
        if (role === 'engineer') {
            const response = await inquirer.prompt(engineerDetail)
            const detail = response['github']
            return ({ employeeName, id, email, role, detail })
        } else if (role === 'intern') {
            const response = await inquirer.prompt(internDetail)
            const detail = response['school']
            return ({ employeeName, id, email, role, detail })
        } else if (role === 'manager') {
            const response = await inquirer.prompt(managerDetail)
            const detail = response['officeNumber']
            return ({ employeeName, id, email, role, detail })
        }
    } catch (err) {
        console.log(err)
    }
}

// Determine number of non-managerial team members
const numberOfNewEmployees = async () => {
    let numberOfEmployees = [
        {
            type: 'input',
            name: 'number',
            message: `How many 'Non-Managerial' employees do you need to create (has to be at least 2)?`,
            validate: function (value) {
                const valid = (Number.isInteger(value) && (value !== 0) && (value !== 1))
                return valid || 'Please press the up arrow button and enter a valid number'
            },
            filter: Number
        }
    ]
    const number = await inquirer.prompt(numberOfEmployees)
    return number
}

// Create sole team manager
const createTeamManager = async () => {
    let isManager, managerName, managerID, managerEmail, managerDetail

    while (isManager !== 'manager') {
        console.log(`
        !!! Warning: You need to create a manager first.
        `)
        const response = await roleDetail()
        const { employeeName, id, email, role, detail } = response
        managerName = employeeName
        managerID = id
        managerEmail = email
        managerDetail = detail
        isManager = role
    }
    const manager = new Manager(managerName, managerID, managerEmail, managerDetail)
    return manager
}

// Create function that prompts user for names and role, 
const teamBuilder = async () => {
    let result = []
    console.log(`
            *** Employee Profile Generator ***

    Please follow the prompts below to build your team profile
    `)

    console.log(`
                    *********************
                    New Manager Creation
                    *********************
        `)
    const manager = await createTeamManager()
    result.push(manager)

    const response = await numberOfNewEmployees()
    const { number } = response

    console.log(`
    !!! Warning: To prevent restart, only create non-managers in the next section.
    `)

    for (let i = 0; i < number; i++) {
        console.log(`
                    *********************
                    New Employee Creation
                    *********************
        `)

        const response = await roleDetail()
        const { employeeName, id, email, role, detail } = response

        if ((role === 'engineer') && (role !== 'manager')) {
            const engineer = new Engineer(employeeName, id, email, detail)
            result.push(engineer)
        } else if ((role === 'intern') && (role !== 'manager')) {
            const intern = new Intern(employeeName, id, email, detail)
            result.push(intern)
        } else {
            console.log("You can not have '2' managers in one team, please start again.")
            return
        }
    }
    return result
}

const renderTeam = async () => {
    const team = await teamBuilder()
    const html = render(team)
    return html
}

const init = async () => {
    try {
        const html = await renderTeam()
        await writeFileP(outputPath, html)
        console.log('Successfully wrote the html file')
    } catch (err) {
        console.error(err)
    }
}
init()