const validate = require('./validation')

// name validation
test("User input (name) has to be at least length of 1", () => {
    const empty = "";
    const name = "Bob Marley"
    expect(validate.nameValidation(empty).toBe("Please enter the employee's full name"));
    expect(validate.nameValidation(name).toBe(true));
});
// github validation
test("User input (name) has to be at least length of 1", () => {
    const empty = "";
    const name = "Bob Marley"
    expect(validate.githubValidation(empty).toBe("Please enter a valid GitHub username"));
    expect(validate.githubValidation(name).toBe(true));
});
// school validation
test("User input (name) has to be at least length of 1", () => {
    const empty = "";
    const name = "Carleton University"
    expect(validate.schoolValidation(empty).toBe("Please enter a valid school name"));
    expect(validate.schoolValidation(name).toBe(true));
});
// id validation
test("User input (id) has to be an integer", () => {
    const int = 7;
    const str = "Bob"
    const float = 5.5
    expect(validate.idValidation(int).toBe(true));
    expect(validate.idValidation(str).toBe("Please press the up arrow button and enter a valid number"));
    expect(validate.idValidation(float).toBe("Please press the up arrow button and enter a valid number"));
});
// office validation
test("User input (id) has to be an integer", () => {
    const int = 7;
    const str = "Bob"
    const float = 5.5
    expect(validate.officeValidation(int).toBe(true));
    expect(validate.officeValidation(str).toBe("Please press the up arrow button and enter a valid number"));
    expect(validate.officeValidation(float).toBe("Please press the up arrow button and enter a valid number"));
});
// additional new employees validation
test("User input (id) has to be an integer", () => {
    const pass = 2;
    const fail = 1
    const float = 5.5
    expect(validate.newEmployeesValidation(pass).toBe(true));
    expect(validate.newEmployeesValidation(fail).toBe("Please press the up arrow button and enter a valid number"));
    expect(validate.newEmployeesValidation(float).toBe("Please press the up arrow button and enter a valid number"));
});
// email validation
test("User input (name) has to be at least length of 1", () => {
    const empty = "";
    const fail1 = "bob@bob";
    const fail2 = "bob.com";
    const pass = "bob@test.com";
    expect(validate.emailValidation(empty).toBe("Please enter a valid email address"));
    expect(validate.emailValidation(fail1).toBe("Please enter a valid email address"));
    expect(validate.emailValidation(fail2).toBe("Please enter a valid email address"));
    expect(validate.emailValidation(pass).toBe(true));
});