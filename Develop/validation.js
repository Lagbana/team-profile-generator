// Validations for App.js

const nameValidation = text => {
    if (text.length < 1) {
        return "Please enter the employee's full name";
    }
    return true;
}
const githubValidation = text => {
    if (text.length < 1) {
        return "Please enter a valid GitHub username";
    }
    return true;
}
const schoolValidation = text => {
    if (text.length < 1) {
        return "Please enter a valid school name";
    }
    return true;
}
const idValidation = value => {
    const valid = (Number.isInteger(value) && (value !== 0))
    return valid || 'Please press the up arrow button and enter a valid number'
}
const officeValidation = value => {
    var valid = (Number.isInteger(value) && (value !== 0));
    return valid || 'Please press the up arrow button and enter a valid office number';
}
const emailValidation = value => {
    const regex = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\.]{2,5}$/i
    return regex.test(value) || 'Please enter a valid email address'
}
const newEmployeesValidation = value => {
    // Number of employees need to be at least 2
    const valid = (Number.isInteger(value) && (value !== 0) && (value !== 1))
    return valid || 'Please press the up arrow button and enter a valid number'
}

const validate = {
    nameValidation,
    githubValidation,
    idValidation,
    emailValidation,
    schoolValidation,
    officeValidation,
    newEmployeesValidation
}

module.exports = validate