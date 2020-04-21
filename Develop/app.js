'use strict'

// Import Dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs").promises;
const validate= require('./validation')
const writeFileP = fs.writeFile

// Output file and folder
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "QA-team.html");

// Render final html 
const render = require("./lib/htmlRenderer");

// Inquirer - new employee questions with tested validations
const newEmployeeQuestions = [
    {
        type: 'input',
        name: 'employeeName',
        message: "What is the employee's full name?",
        validate: validate.nameValidation,
        filter: String
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your employee's id?",
        validate: validate.idValidation,
        filter: Number
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your employee's work email?",
        validate: validate.emailValidation,
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

// Role Specific Questionnaire with validation
let engineerDetail = [
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's GitHub username?",
        validate: validate.githubValidation,
        filter: String
    }
]
let internDetail = [
    {
        type: 'input',
        name: 'school',
        message: "What school does the intern currently attend?",
        validate: validate.schoolValidation,
        filter: String
    }
]
let managerDetail = [
    {
        type: 'number',
        name: 'officeNumber',
        message: "What is the manager's office number",
        validate: validate.officeValidation,
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
            validate: validate.newEmployeesValidation,
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
        Application will restart if the first created employee is not a manager.
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
    console.log(`
        Team manager successfully created!
    `)
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
            console.log(`
                New engineer successfully created!
            `)
            result.push(engineer)
        } else if ((role === 'intern') && (role !== 'manager')) {
            const intern = new Intern(employeeName, id, email, detail)
            console.log(`
                New intern successfully created!
            `)
            result.push(intern)
        } else {
            console.log("You can not have '2' managers in one team, please start again.")
            return
        }
    }
    return result
}

// Create html file using team objects
const renderTeam = async () => {
    const team = await teamBuilder()
    const html = render(team)
    return html
}

// Initialize application
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