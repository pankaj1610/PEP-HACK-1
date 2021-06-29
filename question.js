let mainMenu = {
  type: "rawlist",
  name: "userChoice",
  message: "Select(Use arrow keys)",
  choices: [
    "Data Structure and Algorithm",
    "Core Subject",
    "Web Developement",
  ],
};

let dsaQuestionList = {
  type: "rawlist",
  name: "userChoice",
  message: "Select any section:",
  choices: ["Leetcode", "Interviewbit"],
};
let coreSubjectList = {
  type: "rawlist",
  name: "userChoice",
  message: "Select any section:",
  choices: [
    "OOPS",
    "Comuter Network",
    "Database Management System",
    "Operating System",
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
  type: "rawlist",
  name: "userChoice",
  message: "Select any section:",
  choices: ["Pepcoding","Traversy Media"],
};

module.exports = {
  dsaQuestionList,
  mainMenu,
  coreSubjectList,
  webDevelopementList,
  dsaQuestion
 
};
