const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const {
  coreSubjectList,
  dsaOptionList,
  mainMenu,
  webDevelopementList,
  dsaQuestion,
  interviewBitOptionList,
} = require("./question.js");
const xlsx = require("xlsx");

let pepcodingLink =
  "https://www.youtube.com/playlist?list=PL-Jc9J83PIiEeD3I4VXETPDmzJ3Z1rWb4";
let traversyMediaLink =
  "https://www.youtube.com/playlist?list=PLillGF-RfqbYeckUaD1z6nviTp31GLTH8";
let userList = [];
let difficultyList = ["Hard", "Easy", "Medium", "hard", "medium", "easy"];

console.log("This is a multi-purpose command line interface.");

inquirer.prompt(mainMenu).then((answers) => {
  switch (answers.userChoice) {
    case "Data Structure and Algorithm":
      solveDsa();
      break;
    case "Core Subject":
      solveCoreSubject();
      break;
    case "Web Developement":
      solveWebDev();
      break;
  }
});

function solveWebDev() {
  inquirer.prompt(webDevelopementList).then((answers) => {
    console.log(answers.userChoice);
    switch (answers.userChoice) {
      case "Pepcoding":
        getWebDevData(pepcodingLink);
        break;
      case "Traversy Media":
        getWebDevData(traversyMediaLink);
        break;
    }
  });
}
function solveCoreSubject() {
  inquirer.prompt(coreSubjectList).then((answers) => {
    getCoreSubjectData(answers.userChoice);
  });
}

function solveDsa() {
  inquirer.prompt(dsaOptionList).then((answers) => {
    switch (answers.userChoice) {
      case "Leetcode":
        inquirer.prompt(dsaQuestion).then((answers) => {
          if (!difficultyList.includes(answers.difficultyChoice)) {
            console.log("Not a valid input.");
            return;
          } else {
            console.log("Fetching data...................");
            getLeetCodeData(answers.userChoice, answers.difficultyChoice);
          }
        });
        break;
      case "Interviewbit":
        inquirer.prompt(interviewBitOptionList).then((answers) => {
          console.log("Fetching data...................");
          getInterviewBitData(answers.userChoice);
        });
    }
  });
}

async function getInterviewBitData(userChoice) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();

  await page.goto("https://www.interviewbit.com/courses/programming/");

  await page.waitForSelector(".topic-box.unlocked a");
  let idx;
  let topicList = await page.evaluate(function () {
    let alltopicLink = document.querySelectorAll(".topic-box.unlocked a");
    let allTopic = [];
    for (let i = 0; i < alltopicLink.length; i++) {
      let map;
      let topicTitle = alltopicLink[i].innerText;
      let topicLink =
        "https://www.interviewbit.com" + alltopicLink[i].getAttribute("href");
      map = { topicTitle, topicLink };
      allTopic.push(map);
    }
    return allTopic;
  });

  for (let i = 0; i < topicList.length; i++) {
    if (userChoice == topicList[i].topicTitle) {
      idx = i;
    }
  }
  await page.goto(topicList[idx].topicLink);
  userList = await page.evaluate(function () {
    let problemLinkList = document.querySelectorAll(".locked.problem_title");
    let allProblemList = [];
    let userChoiceMap;

    for (let i = 0; i < problemLinkList.length; i++) {
      let problemTitle = problemLinkList[i].innerText;
      let prolemLink =
        "https://www.interviewbit.com" +
        problemLinkList[i].getAttribute("href");
      console.log(problemLinkList[i]);
      userChoiceMap = { problemTitle, prolemLink };
      allProblemList.push(userChoiceMap);
    }
    return allProblemList;
  });
  await writeInExcel(userList, "interviewbit");
  console.log("A copy of data is saved in your current directory.");
  await browser.close();
}

async function getLeetCodeData(userChoice, difficultyChoice) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  await page.goto("https://leetcode.com/problemset/all");
  await page.waitForSelector(".flex.relative.mb-1 a");

  let allTopic = await page.evaluate(function () {
    let allTag = document.querySelectorAll(".flex.relative.mb-1 a");
    let allTopicList = {};

    for (let i = 0; i < allTag.length; i++) {
      let tagName = allTag[i].innerText.split("\n")[0];
      let anchorLink = "https://leetcode.com" + allTag[i].getAttribute("href");
      allTopicList[tagName] = anchorLink;
    }
    return allTopicList;
  });

  userChoice = userChoice[0].toUpperCase() + userChoice.substring(1);
  let useChoiceExist = Object.keys(allTopic).includes(userChoice);
  let difficultyChoiceExist = difficultyList.includes(difficultyChoice);
  if (useChoiceExist && difficultyChoiceExist) {
    // do nothing
  } else {
    console.log("Please enter correct value");
    await browser.close();
    return;
  }

  await Promise.all([
    page.goto(allTopic[userChoice]),
    page.waitForNavigation(),
  ]);

  await page.waitForSelector(".title-cell__ZGos>a");

  userList = await page.evaluate(function (difficultyChoice) {
    let problemLinkList = document.querySelectorAll(".title-cell__ZGos>a");
    let problemDifficultyList = document.querySelectorAll(
      "[label = 'Difficulty']"
    );
    let allProblemList = [];
    let userChoiceMap;

    for (let i = 0; i < problemLinkList.length; i++) {
      let problemTitle = problemLinkList[i].innerText;
      let prolemLink =
        "https://leetcode.com" + problemLinkList[i].getAttribute("href");

      if (
        problemDifficultyList[i].innerText.toLowerCase() == difficultyChoice
      ) {
        userChoiceMap = { problemTitle, prolemLink };
        allProblemList.push(userChoiceMap);
      }
    }
    return allProblemList;
  }, difficultyChoice);

  await writeInExcel(userList, "leetcode");
  console.log("A copy of data is saved in your current directory.");
  await browser.close();
}

function getCoreSubjectData(userChoice) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();

  await page.goto("https://www.interviewbit.com/courses/programming/");
}

async function getWebDevData(userChoice) {
  let totalvideos = 0;
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  await page.goto(userChoice);
  await page.waitForSelector("#stats .style-scope.yt-formatted-string");

  totalvideos = await page.evaluate(function () {
    let videoCount = document.querySelectorAll(
      "#stats .style-scope.yt-formatted-string"
    )[0];
    return Number(videoCount.innerText);
  });

  await page.waitForSelector(
    "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
  );
  await page.waitForSelector("a#video-title");
  userList = await page.evaluate(async function (totalvideos) {
    let durationList = document.querySelectorAll(
      "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
    );

    let videoTitleList = document.querySelectorAll("a#video-title");

    await new Promise(function (resolve, reject) {
      let interval = setInterval(function () {
        if (totalvideos != durationList.length) {
          let videoCardContainer = document.querySelector("#contents");
          window.scrollTo(0, videoCardContainer.scrollHeight);
          durationList = document.querySelectorAll(
            "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
          );
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 500);
    });

    let userChoiceMap;
    let allVideoDetail = [];
    for (let i = 0; i < durationList.length; i++) {
      let videoTitle = videoTitleList[i].innerText;
      let duration = durationList[i].innerText.trim();
      let videoLink =
        "https://www.youtube.com" + videoTitleList[i].getAttribute("href");
      userChoiceMap = { videoTitle, videoLink, duration };
      allVideoDetail.push(userChoiceMap);
    }
    return allVideoDetail;
  }, totalvideos);
  await writeInExcel(userList, "webdev");
  console.log("A copy of data is saved in your current directory.");
  await browser.close();
}

function writeInExcel(userList, excelfile) {
  let newWorkBook = xlsx.utils.book_new();
  let newWorkSheet = xlsx.utils.json_to_sheet(userList);
  xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, "sheet");
  xlsx.writeFile(newWorkBook, excelfile + ".xlsx");
}
