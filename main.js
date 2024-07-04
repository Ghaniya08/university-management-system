#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class student {
    static counter = 2300;
    id;
    name;
    courses;
    department;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.department = [];
    }
    departments(department) {
        this.department.push(department);
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    show_status() {
        console.log(chalk.italic.yellow(`ID : ${this.id} `));
        console.log(chalk.italic.yellow(`Name ${this.name}`));
        console.log(chalk.italic.yellow(`Department : IT ${this.department}`));
        console.log(chalk.italic.yellow(`Courses : ${this.courses}`));
    }
    teacher() {
    }
    teacher_Info() {
    }
}
class std_manager {
    students;
    constructor() {
        this.students = [];
    }
    new_student(name) {
        let studEnt = new student(name);
        this.students.push(studEnt);
        console.log(chalk.green.italic(`${name} successfully added in new student and his/her id is ${studEnt.id} :`));
    }
    department_go(student_id, name, department) {
        let stud_dep = this.find_student(student_id);
        if (stud_dep) {
            stud_dep.departments(department);
            console.log(chalk.green.italic("You are selected in IT department scccessfully"));
        }
        else {
            console.log(chalk.red.italic(" Student not found . please enter a correct user ID "));
        }
    }
    enroll_student(student_id, course) {
        let stud_course = this.find_student(student_id);
        if (stud_course) {
            stud_course.enroll_course(course);
            console.log(chalk.green.italic(`${stud_course.name} enrolled in ${course} successfully`));
        }
        else {
            console.log(chalk.red.italic(" Student not found . please enter a correct user ID "));
        }
    }
    show_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log(chalk.red.italic("Student not found . please enter a correct user ID "));
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
    teacher() {
        console.log((chalk.italic.yellow `The teacher for IT department is "Hamzah Syed" `));
    }
    teacher_Info() {
        console.log(chalk.italic.magenta("Teacher name: Hamzah Syed \nAge : 22 \nSalary : 1000000 \nDepartment : IT"));
    }
}
async function main() {
    console.log(chalk.bgBlackBright.yellow.italic("University managment system"));
    let std_work = new std_manager();
    while (true) {
        let student_choice = await inquirer.prompt([
            {
                name: "students",
                message: chalk.blue.italic("Choose an option:"),
                type: "list",
                choices: [
                    "Add student",
                    "Go to the departments",
                    "Courses ",
                    "Show status",
                    "Teacher",
                    "Teacher info",
                    "Exit"
                ]
            }
        ]);
        switch (student_choice.students) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: (chalk.yellow.italic)("Enter a student name : "),
                    }
                ]);
                std_work.new_student(name_input.name);
                break;
            case "Go to the departments":
                let department_go = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: chalk.blue.italic("Enter the student ID : ")
                    },
                    {
                        name: "departments",
                        message: chalk.green.italic("Select the given department you want to go : "),
                        type: "list",
                        choices: ["IT department"]
                    }
                ]);
                std_work.department_go(department_go.std_id, department_go.departments, department_go.name);
                break;
            case "Courses ":
                let enroll_process = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: chalk.blue.italic("Enter the student ID : ")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.blue.italic("Enter the course name : ")
                    }
                ]);
                std_work.enroll_student(enroll_process.std_id, enroll_process.course);
                break;
            case "Teacher":
                std_work.teacher();
                break;
            case "Teacher info":
                std_work.teacher_Info();
                break;
            case "Show status":
                let status = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.blue.italic("Enter the student ID : ")
                    }
                ]);
                std_work.show_status(status.student_id);
                break;
            case "Exit":
                console.log(chalk.red.italic("Exiting..."));
                process.exit();
        }
    }
}
main();
