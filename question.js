let mainMenu = {
  type: "rawlist",
  name: "userChoice",
  message: "Select(Use arrow keys)",
  choices: [
    "Aptitude",
    "Data Structure and Algorithm",
    "Core Subject",
    "Web Developement",
    "Job Information",
  ],
};
let aptitudeQuestionList = {
  type: "rawlist",
  name: "userChoice",
  message: "Select any section:",
  choices: [
    "Arithmetic Aptitude",
    "Verbal Ability",
    "Verbal Reasoning",
    "Logical Reasoning",
    "Data Interpretation",
    "Back",
  ],
};
let dsaQuestionList = {
  type: "rawlist",
  name: "UserChoice",
  message: "Select any section:",
  choices: ["Pepcoding", "Leetcode", "Geeks for Geeks", "Interviewbit"],
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

let webDevelopementList = {
    type:'list',
    name:'userChoice',
    message:'Select any section:',
    choices: ['Pepcoding', 'Free Code Camp', 'Traversy Media']
}
let jobInformationQuestion = [{
    type: 'input',
    name: 'userChoice',
    message: "Enter company:",
},{
    type: 'input',
    name: 'userCityChoice',
    message: "Enter city or state:",
}]
    

module.exports = {
  aptitudeQuestionList,
  dsaQuestionList,
  mainMenu,
  coreSubjectList,
  webDevelopementList,
  jobInformationQuestion
};
