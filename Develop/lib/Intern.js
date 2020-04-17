const Employee = require('./Employee')


class Intern extends Employee {
    constructor (school) {
        super(name, id, email);
        this.school = school;
    }
    getSchool () {
        // Should this be getting user input????
        return `${this.school}`;
    }
    getRole () {
        return "Intern";
    }
}

module.exports = Intern;
