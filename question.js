let mainMenu = {
  type: "list",
  name: "userChoice",
  message: "Select(Use arrow keys)",
  choices: [
    "Data Structure and Algorithm",
    "Web Developement",
    "Exit"
  ],
};

let dsaOptionList = {
  type: "list",
  name: "userChoice",
  message: "Select any section:",
  choices: ["Leetcode", "Interviewbit","Exit"],
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
let interviewBitOptionList = {
  type: "list",
  name: "userChoice",
  message: "Select any section:",
  choices: [
    "Time Complexity",
    "Arrays",
    "Math",
    "Binary Search",
    "Strings",
    "Bit Manipulation",
    "Two Pointers",
    "Linked Lists",
    "Stacks And Queues",
    "Backtracking",
    "Hashing",
    "Heaps And Maps",
    "Tree Data Structure",
    "Dynamic Programming",
    "Greedy Algorithm",
    "Graph Data Structure & Algorithm",
    "Exit"
  ],
}
module.exports = {
  dsaOptionList,
  mainMenu,
  webDevelopementList,
  dsaQuestion,
  interviewBitOptionList
 
};
