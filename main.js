"use strict";
const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const {
  coreSubjectList,
  dsaQuestionList,
  mainMenu,
  webDevelopementList,
  jobInformationQuestion,
  dsaQuestion,
} = require("./question.js");
// let allTopicList = [];

let difficultyList = ["Hard", "Easy", "Medium","hard", "easy", "medium"];
console.log("This is a multi-purpose command line interface.");

inquirer.prompt(mainMenu).then((answers) => {
  if (answers.userChoice == "Data Structure and Algorithm") {
    inquirer.prompt(dsaQuestionList).then((answers) => {
      if (answers.userChoice == "Leetcode") {
        inquirer.prompt(dsaQuestion).then((answers) => {
          getLeetCodeData(answers.userChoice, answers.difficultyChoice);
        });
      } else if (true) {
      }
    });
  } else if (answers.userChoice == "Core Subject") {
    inquirer.prompt(coreSubjectList).then((answers) => {
      console.log(answers.userChoice);
      getCoreSubjectData(answers.userChoice);
    });
  } else if (answers.userChoice == "Web Developement") {
    inquirer.prompt(webDevelopementList).then((answers) => {
      console.log(answers.userChoice);
      getWebDevData(answers.userChoice);
    });
  } else {
    inquirer.prompt(jobInformationQuestion).then((answers) => {
      getJobInformation(answers.userChoice, answers.userCityChoice);
    });
  }
});

async function getJobInformation(userJobChoice, userLocation) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/jobs/search?position=1&pageNum=0");
  await page.waitForSelector("[placeholder ='Search job titles or companies']");
  await page.type(
    '[placeholder ="Search job titles or companies"]',
    userJobChoice
  );
  await page.click("[placeholder ='Location']");
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("KeyX");
  await page.keyboard.up("Control");
  await page.type("[placeholder ='Location']", userLocation);
  await page.click(
    '[data-tracking-control-name="public_jobs_jobs-search-bar_base-search-bar-search-submit"]'
  );
  await page.waitForNavigation();
  await page;
  // await browser.close();
}

async function getLeetCodeData(userChoice, difficultyChoice) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  try {
    await page.goto("https://leetcode.com/problemset/all");
  } catch {
    await page.click("#reload-button");
  }
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
  // console.log(allTopic);
  userChoice = userChoice[0].toUpperCase() + userChoice.substring(1);
  
  let useChoiceExist = Object.keys(allTopic).includes(userChoice);
  let difficultyChoiceExist = difficultyList.includes(difficultyChoice);
  if (useChoiceExist && difficultyChoiceExist) {
    await page.goto(allTopic[userChoice]);
  } else {
    console.log("Please enter correct value");
  }
}

function getCoreSubjectData(userChoice) {}

function getWebDevData(userChoice) {}
