let mainMenu = {
  type: "list",
  name: "userChoice",
  message: "Select(Use arrow keys)",
  choices: [
    "Data Structure and Algorithm",
    "Core Subject",
    "Web Developement",
    "Exit"
  ],
};

let dsaQuestionList = {
  type: "list",
  name: "userChoice",
  message: "Select any section:",
  choices: ["Leetcode", "Interviewbit","Exit"],
};
let coreSubjectList = {
  type: "list",
  name: "userChoice",
  message: "Select any section:",
  choices: [
    "OOPS",
    "Comuter Network",
    "Database Management System",
    "Operating System",
    "Exit"
  ],
};

let dsaQuestion = [
  {
    type: "input",
    name: "userChoice",
    message: "Enter topic:",
  },
  {
    type: "input",
    name: "difficultyChoice",
    message: "Enter difficulty:",
  },
]

let webDevelopementList = {
  type: "list",
  name: "userChoice",
  message: "Select any section:",
  choices: ["Pepcoding","Traversy Media","Exit"],
};

module.exports = {
  dsaQuestionList,
  mainMenu,
  coreSubjectList,
  webDevelopementList,
  dsaQuestion
 
};
