const Employee = require('./Employee');

class Engineer extends Employee {
    constructor (githubUserName) {
        super(name, id, email);
        this.github = githubUserName;
    }
    getGithub () {
        // Should this be getting user input????
        return `https://github.com/${this.github}`;
    }
    getRole () {
        return "Engineer";
    }
}

module.exports = Engineer;