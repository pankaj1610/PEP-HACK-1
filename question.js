let mainMenu = {
  type: "rawlist",
  name: "userChoice",
  message: "Select(Use arrow keys)",
  choices: [
    "Data Structure and Algorithm",
    "Core Subject",
    "Web Developement",
    "Job Information",
  ],
};

let dsaQuestionList = {
  type: "rawlist",
  name: "userChoice",
  message: "Select any section:",
  choices: ["Leetcode", "Geeks for Geeks", "Interviewbit"],
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
  choices: ["Pepcoding", "Free Code Camp", "Traversy Media"],
};
let jobInformationQuestion = [
  {
    type: "input",
    name: "userChoice",
    message: "Enter company:",
  },
  {
    type: "input",
    name: "userCityChoice",
    message: "Enter city or state:",
  },
];


module.exports = {
  dsaQuestionList,
  mainMenu,
  coreSubjectList,
  webDevelopementList,
  jobInformationQuestion,
  dsaQuestion
 
};
